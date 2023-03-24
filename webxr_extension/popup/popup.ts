import localforage from "localforage";
import { AnyMessage, AttachToTargetMessage, GetDevtoolTargetsMessage, StartCaptureMessage } from "../types/messages";

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
    refreshTargetsButton.onclick = async () => {
        await localforage.removeItem("saved_target");
        await fetchTargets();
    };
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

const attemptAttachSavedTarget = async () => {
    const savedTarget = await localforage.getItem("saved_target");
    if (!savedTarget) {
        await onDisconnectedTarget();
        return;
    }
    const response = await chrome.runtime.sendMessage<AttachToTargetMessage, AnyMessage>({
        type: "attachToTarget",
        target: savedTarget,
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
                        await onConnectedTarget(targetResponse.target);
                    } else if (targetResponse.type === 'error') {
                        // we couldn't connect to this specific tab, so we disconnect.
                        targetList.textContent = JSON.stringify(targetResponse.error);
                        await onDisconnectedTarget()

                    }
                };
                targetList.appendChild(targetButton);
            }
            break;

        // this means that we couldn't connect at all.
        case "error":
            targetList.textContent = JSON.stringify(response.error);
            await onDisconnectedTarget()
            break;
    }
}

const onConnectedTarget = async (target: any) => {
    // change the popup content to account for it.
    captureTargetLabel.innerHTML = "Attached to remote tab: " + target.title
    targetList.innerHTML = "";
    captureUI.style.display = 'block';
    // save the target so we automatically return to it once we take a capture or close the popup.
    await localforage.setItem("saved_target", target);
}

const onDisconnectedTarget = async () => {
    captureUI.style.display = 'none';
    await localforage.removeItem("saved_target");
}

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
