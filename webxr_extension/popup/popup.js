(() => {
  // window-shim.js
  var fakeWindow = {};
  if (typeof window !== "undefined") {
    fakeWindow = window;
  }
  fakeWindow.criRequest = async (options, callback) => {
    const { host, port, path } = options;
    const url = `http://${host}:${port}${path}`;
    console.log(url);
    try {
      const res = await fetch({
        url,
        method: "get"
      });
      const responseText = await res.text();
      callback(null, responseText);
    } catch (e) {
      callback(e, null);
    }
  };

  // popup/popup.ts
  var currentTarget = void 0;
  var targetList;
  var refreshTargetsButton;
  var captureUI;
  var captureTargetLabel;
  var quickCaptureCheckbox;
  var fullCaptureCheckbox;
  var commandCountInput;
  fakeWindow.onload = () => {
    initialize();
    fetchTargets();
  };
  var initialize = () => {
    targetList = document.getElementById("targets");
    refreshTargetsButton = document.getElementById("targetButton");
    refreshTargetsButton.onclick = fetchTargets;
    captureUI = document.getElementById("captureUI");
    captureTargetLabel = document.getElementById("captureTarget");
    captureUI.style.display = "none";
    const captureButton = document.getElementById("captureNow");
    captureButton.onclick = capture;
    quickCaptureCheckbox = document.getElementById("quickCapture");
    fullCaptureCheckbox = document.getElementById("fullCapture");
    commandCountInput = document.getElementById("captureOnLoadCount");
  };
  var fetchTargets = async () => {
    captureUI.style.display = "none";
    const response = await chrome.runtime.sendMessage({ type: "getTargets" });
    switch (response.type) {
      case "listOfTargets":
        targetList.textContent = "";
        for (let target of response.targets) {
          const targetButton = document.createElement("button");
          targetButton.textContent = target.title;
          targetButton.onclick = async () => {
            const targetResponse = await chrome.runtime.sendMessage({
              type: "attachToTarget",
              target
            });
            if (targetResponse.type === "connectedToTarget") {
              onConnectedTarget(targetResponse.target);
            } else if (targetResponse.type === "error") {
              targetList.textContent = JSON.stringify(targetResponse.error);
              await onDisconnectedTarget();
            }
          };
          targetList.appendChild(targetButton);
        }
        break;
      case "error":
        targetList.textContent = JSON.stringify(response.error);
        await onDisconnectedTarget();
        break;
    }
  };
  var onConnectedTarget = (target) => {
    currentTarget = target;
    captureTargetLabel.innerHTML = "Attached to remote tab: " + target.title;
    targetList.innerHTML = "";
    captureUI.style.display = "block";
  };
  var onDisconnectedTarget = async () => {
    currentTarget = void 0;
    captureUI.style.display = "none";
  };
  var capture = async () => {
    var commandCount = parseInt(commandCountInput.value);
    if (commandCount < 0 || commandCount === Number.NaN) {
      commandCount = 500;
    }
    await chrome.runtime.sendMessage({
      type: "startCapture",
      captureOnLoadCount: commandCount,
      quickCapture: quickCaptureCheckbox.checked,
      fullCapture: fullCaptureCheckbox.checked
    });
  };
})();
