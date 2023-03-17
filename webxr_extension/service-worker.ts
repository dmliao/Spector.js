// @ts-ignore this explicit .js file has no typings
import CDP from "chrome-remote-interface/chrome-remote-interface.js";
import CDPTypes from "chrome-remote-interface";

import type LocalForageType from 'localforage';
// @ts-ignore this explicit .js file has no typings
import localforageImport from 'localforage/src/localforage.js';

import initSpectorContentScript from "./injected/initSpector.js?raw";
import setupCaptureContentScript from "./injected/setupCapture.js?raw";

import { AnyMessage, ConnectedToTargetMessage, ErrorMessage, ListDevToolTargetsMessage } from "./types/messages";



// fetch the json of external targets to grab the websocket server URLs
const getRemoteTargets = async () => {
	const res = await fetch("http://localhost:9222/json");
	return await res.json();
};

let websocketDebuggerURL: string;
// NOTE: this cannot be an arrow () => {} function because otherwise it'd overwrite the chrome
// object with the runtime only one, and we'll lose all of our server-only APIs.
// so, the callback must be of type function() {}
chrome.runtime.onMessage.addListener(function (request: AnyMessage, sender, sendResponse: <T>(response: T) => void) {
	// sends to the popup all the tabs
	switch (request.type) {
		case 'getTargets': {
			getRemoteTargets()
				.then((targets) => {
					const actualTargets = [];
					for (let t of targets) {
						// we don't want to get the panel app nav ui, though this can be relaxed
						// for other extensions...
						if (t.type === "page") {
							actualTargets.push(t);
						}
					}
					sendResponse<ListDevToolTargetsMessage>({
						type: "listOfTargets",
						targets: actualTargets,
					});

					return true;
				})
				.catch((e) => {
					console.log(e);
					sendResponse<ErrorMessage>({
						type: "error",
						error: e,
					});

					return true;
				});
			break;
		}
		case 'attachToTarget': {
			websocketDebuggerURL = request.target.webSocketDebuggerUrl;

			connectToClient(websocketDebuggerURL).then(() => {
				sendResponse<ConnectedToTargetMessage>({
					type: 'connectedToTarget',
					target: request.target
				})
			}).catch((e) => {
				sendResponse<ErrorMessage>({
					type: 'error',
					error: e
				})
			})
			break;
		}

		case 'startCapture': {
			// TODO: also take into account full / quick capture
			captureFromClient(websocketDebuggerURL).then(() => {
				// no response needed I guess.
				return true;
			}).catch((e) => {

			});
			return false;
		}
	}

	return true;
});

async function connectToClient(websocket: string) {
	let client: CDPTypes.Client;
	try {
		// the extension did NOT like just saying CDP() when built with esbuild, so needed CDP.CDP()
		// it might be different with webpack or rollup
		client = await CDP.CDP({
			// string, websocket url
			target: websocket,

			// local needs to be true because Chrome Android does not come with its own version of the protocol
			// so we have to use the one from desktop
			local: true,
		});
		// extract domains
		const { Network, Page } = client;
		// setup handlers
		Network.requestWillBeSent((params) => {
			console.log(params.request.url);
		});
		// enable events then start!
		await Network.enable();
		await Page.enable();
		await Page.addScriptToEvaluateOnNewDocument({
			source: initSpectorContentScript
		})
		await Page.reload();
		await Page.loadEventFired();
		await Page.bringToFront();
	} catch (err) {
		console.error(err);
		throw err;
	} finally {
		if (client) {
			await client.close();
		}
	}
}

async function captureFromClient(websocket: string) {
	let client: CDPTypes.Client;
	try {
		client = await CDP.CDP({
			// string, websocket url
			target: websocket,

			// local needs to be true because Chrome Android does not come with its own version of the protocol
			// so we have to use the one from desktop
			local: true,
		});
		const response = await client.Runtime.evaluate({
			expression: setupCaptureContentScript,
			awaitPromise: true,
			returnByValue: true,
		});

		const localforage: typeof LocalForageType = localforageImport;
		await localforage.setItem('capture', response.result.value);
		chrome.tabs.create({
			url: "result.html",
		}, (tab) => {

		})
		if (client) {
			await client.close();
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
}
