import { AnyMessage, AttachToTargetMessage, GetDevtoolTargetsMessage, StartCaptureMessage } from "../types/messages";

let currentTarget: any = undefined;

// HTML elements
let targetList: HTMLElement;
let refreshTargetsButton: HTMLButtonElement;
let captureUI: HTMLElement;
let captureTargetLabel: HTMLElement;
let quickCaptureCheckbox: HTMLInputElement;
let fullCaptureCheckbox: HTMLInputElement;
let commandCountInput: HTMLInputElement;

window.onload = () => {
	initialize();
	fetchTargets();
};

const initialize = () => {
	targetList = document.getElementById("targets");
	refreshTargetsButton = document.getElementById("targetButton") as HTMLButtonElement
	refreshTargetsButton.onclick = fetchTargets;
	captureUI = document.getElementById("captureUI");
	captureTargetLabel = document.getElementById("captureTarget");
	captureUI.style.display = 'none';

	const captureButton = document.getElementById("captureNow");
	captureButton.onclick = capture;

	quickCaptureCheckbox = document.getElementById("quickCapture") as HTMLInputElement;
	fullCaptureCheckbox = document.getElementById("fullCapture") as HTMLInputElement;
	commandCountInput = document.getElementById("captureOnLoadCount") as HTMLInputElement;
}

const fetchTargets = async () => {
	captureUI.style.display = 'none';
	const response = await chrome.runtime.sendMessage<GetDevtoolTargetsMessage, AnyMessage>({ type: "getTargets" });

	switch (response.type) {

		case "listOfTargets":
			targetList.textContent = "";
			for (let target of response.targets) {
				const targetButton = document.createElement("button");
				targetButton.textContent = target.title;
				targetButton.onclick = async () => {
					const targetResponse = await chrome.runtime.sendMessage<AttachToTargetMessage, AnyMessage>({
						type: "attachToTarget",
						target: target,
					});
					if (targetResponse.type === 'connectedToTarget') {
						onConnectedTarget(targetResponse.target);
					} else if (targetResponse.type === 'error') {
						// it was an error
						targetList.textContent = JSON.stringify(targetResponse.error);
						await onDisconnectedTarget()

					}
				};
				targetList.appendChild(targetButton);
			}
			break;
		case "error":
			targetList.textContent = JSON.stringify(response.error);
			await onDisconnectedTarget()
			break;
	}
}

const onConnectedTarget = (target: any) => {
	// change the popup content to account for it.
	currentTarget = target;
	captureTargetLabel.innerHTML = "Attached to remote tab: " + target.title
	targetList.innerHTML = "";
	captureUI.style.display = 'block';
}

const onDisconnectedTarget = async () => {
	currentTarget = undefined;
	captureUI.style.display = 'none';
}

const capture = async () => {
	var commandCount = parseInt(commandCountInput.value);
	if (commandCount < 0 || commandCount === Number.NaN) {
		commandCount = 500;
	}
	await chrome.runtime.sendMessage<StartCaptureMessage>({
		type: 'startCapture',
		captureOnLoadCount: commandCount,
		quickCapture: quickCaptureCheckbox.checked,
		fullCapture: fullCaptureCheckbox.checked,
	})
}
