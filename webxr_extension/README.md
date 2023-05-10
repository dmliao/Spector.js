# Spector.JS WebXR Extension

Allows you to remotely debug a WebXR session using Spector.JS via a USB-connected headset.

This is distinct from the regular extension (found in [extensions](../extensions/)) for a few reasons:

1. This extension uses Chromium's Manifest V3, and is currently only built for Chromium-based browsers. The extension is built for Meta Quest devices, whose browser runs on Chromium, and thus can use the developer tools to talk to the extension.
2. The WebXR extension needs its own build step to pull in some external dependencies (to work with those chrome dev tools).

## How to use (from source)

1. Pull the Spector.JS repository.
2. Run `npm install` inside of the `webxr_extension` folder, and then `node build` to build all of the JS files. It should create a new `/dist` folder in the webxr_extension directory.
3. Load the `webxr_extension/dist` folder as an Unpacked extension in Chrome's extension manager.

Now you should have the extension available on desktop. Now you can use Spector.JS to debug WebXR sessions:

1. Connect your headset to your computer
2. Open the web browser on your headset. (You may need to open it with the `--remote-allow-origins=*` flag set if the extension fails to connect to tabs)
3. Run `adb forward tcp:9222 localabstract:chrome_devtools_remote` on your desktop (you must have `adb` installed.)
4. Open the extension popup on desktop. The popup should have buttons for all of your remote tabs (as well as a refresh button that refreshes the list)
5. Select a tab from the dropdown to connect the devtools to that tab.
6. Enter VR on the tab in headset.
7. Click 'Capture' on the extension popup to create a capture, which will open in a new tab on desktop.

