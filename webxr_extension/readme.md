# Spector.JS WebXR Extension

Allows you to remotely debug a WebXR session using Spector.JS via a USB-connected headset.

This is distinct from the regular extension (found in [extensions](../extensions/)) for a few reasons:

1. This extension uses Chromium's Manifest V3, and is currently only built for Chromium-based browsers. The extension is built for Meta Quest devices, whose browser runs on Chromium, and thus can use the developer tools to talk to the extension.
2. The WebXR extension needs its own build step to pull in some external dependencies (to work with those chrome dev tools).

