import localforage from "localforage";
import type CDPTypes from "chrome-remote-interface";
import SlimSelect from "slim-select";
import type { AnyMessage, AttachToTargetMessage, GetDevtoolTargetsMessage, StartCaptureMessage } from "../types/messages";
import type { DataArrayPartial, OptionOptional } from "slim-select/dist/store";

// HTML elements
let noTargetView: HTMLElement;
let hasTargetView: HTMLElement;
let loadingTargetView: HTMLElement;

let targetListSelector: SlimSelect;
let refreshTargetsButtons: NodeListOf<HTMLButtonElement>
let captureUI: HTMLElement;
let captureTargetLabel: HTMLElement;
let quickCaptureCheckbox: HTMLInputElement;
let fullCaptureCheckbox: HTMLInputElement;
let commandCountInput: HTMLInputElement;

// other globals
let isConnectedToDevice: boolean = false;

window.onload = () => {
	initialize();
	fetchTargets();
};

type TargetSelectorOption = {
	target: CDPTypes.Target,
	onSelected: (target: CDPTypes.Target) => Promise<void>
}

type MapOptionToTargetSelector = Record<string, TargetSelectorOption>

/**
 * Used to get from the text in the target select UI to the actual target objects and select functions.
 */
let selectableTargets: MapOptionToTargetSelector = {}

const initialize = () => {
	noTargetView = document.getElementById("noTargets");
	hasTargetView = document.getElementById("hasTargets");
	loadingTargetView = document.getElementById("loadingTargets");
	setVisibleView(true);

	targetListSelector = new SlimSelect({
		select: '#targets',
		events: {
			afterChange: (newVal) => {
				const selectedOption = newVal[0]
				const targetWrapper = selectableTargets[selectedOption.text]
				if (!targetWrapper) {
					return
				}
				targetWrapper.onSelected(targetWrapper.target)
			}
		}
	});

	refreshTargetsButtons = document.querySelectorAll(".refreshTargetButton") as NodeListOf<HTMLButtonElement>
	for (let button of refreshTargetsButtons) {
		button.onclick = async () => {
			setVisibleView(true);
			await localforage.removeItem("saved_target");

			await fetchTargets();
		};
	}

	captureUI = document.getElementById("captureUI");
	captureTargetLabel = document.getElementById("captureTarget");
	captureUI.style.display = 'none';

	const captureButton = document.getElementById("captureNow");
	captureButton.onclick = capture;

	quickCaptureCheckbox = document.getElementById("quickCapture") as HTMLInputElement;
	fullCaptureCheckbox = document.getElementById("fullCapture") as HTMLInputElement;
	commandCountInput = document.getElementById("captureOnLoadCount") as HTMLInputElement;

	attemptAttachSavedTarget();
}

// UI

const setVisibleView = (isLoading: boolean = false) => {
	if (isLoading) {
		loadingTargetView.style.display = 'flex';
		noTargetView.style.display = 'none';
		hasTargetView.style.display = 'none';
		return
	}
	if (!isConnectedToDevice) {
		loadingTargetView.style.display = 'none';
		noTargetView.style.display = 'block';
		hasTargetView.style.display = 'none';
	} else {
		loadingTargetView.style.display = 'none';
		noTargetView.style.display = 'none';
		hasTargetView.style.display = 'block';
	}
}

/**
 * @param targets A list of targets (tabs that can be attached to) returned from the chrome devtool protocol.
 * @param onSelectTarget Used for debugging, can modify the behavior when a target is selected
 */
const populateTargetList = (targets: CDPTypes.Target[], onSelectTarget?: (target: CDPTypes.Target) => Promise<void>) => {
	const options: DataArrayPartial = []
	options.push({
		text: "Select a tab to attach to.",
		placeholder: true
	})
	selectableTargets = {}
	const existingSelected = targetListSelector.getSelected()
	for (let target of targets) {
		selectableTargets[target.title] = {
			target: target,
			onSelected: onSelectTarget ?? (async (target) => {
				const targetResponse = await chrome.runtime.sendMessage<AttachToTargetMessage, AnyMessage>({
					type: "attachToTarget",
					target: target,
				});
				if (targetResponse.type === 'connectedToTarget') {
					await onConnectedTarget(targetResponse.target);
				} else if (targetResponse.type === 'error') {
					// we couldn't connect to this specific tab, so we disconnect.
					// TODO: add a subview here!
					await onDisconnectedTarget()
				}
			})
		}
		const option: OptionOptional = {
			text: target.title,
		}
		if (existingSelected.includes(option.text)) {
			option.selected = true
		}
		options.push(option)

	};
	targetListSelector.setData(options)
}

// TARGET SETUP

const attemptAttachSavedTarget = async () => {
	const savedTarget = await localforage.getItem("saved_target");
	if (!savedTarget) {
		await onDisconnectedTarget();
		return;
	}
	const response = await chrome.runtime.sendMessage<AttachToTargetMessage, AnyMessage>({
		type: "attachToTarget",
		target: savedTarget as CDPTypes.Target,
	});
	if (response.type === 'connectedToTarget') {
		await onConnectedTarget(response.target);
	} else if (response.type === 'error') {
		await onDisconnectedTarget()
	}
}

const fetchTargets = async () => {
	captureUI.style.display = 'none';
	const response = await chrome.runtime.sendMessage<GetDevtoolTargetsMessage, AnyMessage>({ type: "getTargets" });

	switch (response.type) {

		case "listOfTargets":
			isConnectedToDevice = true;
			setVisibleView();
			populateTargetList(response.targets)
			break;

		// this means that we couldn't connect at all.
		case "error":
			isConnectedToDevice = false;
			targetListSelector.setData([]);
			// targetList.textContent = JSON.stringify(response.error);
			await onDisconnectedTarget()
			break;
	}
}

/**
 * Currently unused; this can be used to mock fetchTargets when you aren't actually connected to a headset.
 * Might be useful for tests if we ever get around to that.
 */
const __debug_fetchTargets = async () => {
	console.log("DEBUG: fetching dummy targets")
	isConnectedToDevice = true;
	await new Promise((resolve) => {
		setTimeout(resolve, 500)
	})
	populateTargetList([{
		url: "http://test.com",
		title: "Test1",
		description: "A test URL",
		id: "abcde",
		type: "tab",
		webSocketDebuggerUrl: "none",
		devtoolsFrontendUrl: "none"
	},
	{
		url: "http://test.com",
		title: "Test2",
		description: "A test URL 2",
		id: "abcdef",
		type: "tab",
		webSocketDebuggerUrl: "none",
		devtoolsFrontendUrl: "none"
	}], async (target) => {
		await onConnectedTarget(target)
	})
	setVisibleView()
}

// EVENTS //

const onConnectedTarget = async (target: any) => {
	// change the popup content to account for it.
	setVisibleView()
	captureTargetLabel.innerHTML = "Attached to remote tab: " + target.title
	captureUI.style.display = 'block';
	// save the target so we automatically return to it once we take a capture or close the popup.
	await localforage.setItem("saved_target", target);
}

const onDisconnectedTarget = async () => {
	captureUI.style.display = 'none';
	setVisibleView()
	await localforage.removeItem("saved_target");
}

// ACTIONS

const capture = async () => {
	var commandCount = parseInt(commandCountInput.value);
	if (commandCount < 0 || commandCount === Number.NaN) {
		commandCount = 500;
	}

	// TODO: this can produce an error if you don't have WebXR turned on.
	// We should handle that.
	await chrome.runtime.sendMessage<StartCaptureMessage>({
		type: 'startCapture',
		captureOnLoadCount: commandCount,
		quickCapture: quickCaptureCheckbox.checked,
		fullCapture: fullCaptureCheckbox.checked,
	})
}
