import type CDPTypes from "chrome-remote-interface";
export type ErrorMessage = {
	type: 'error',
	error: any
}

// messages from popup to service worker
export type GetDevtoolTargetsMessage = {
	type: 'getTargets'
}

export type AttachToTargetMessage = {
	type: 'attachToTarget',
	target: CDPTypes.Target
}

export type StartCaptureMessage = {
	type: 'startCapture',
	quickCapture: boolean,
	fullCapture: boolean,
	captureOnLoadCount: number,
}

// messages from service worker to popup
export type ListDevToolTargetsMessage = {
	type: 'listOfTargets',
	targets: CDPTypes.Target[]
}

export type ConnectedToTargetMessage = {
	type: 'connectedToTarget',
	target: CDPTypes.Target
}

export type AnyMessage = ErrorMessage | GetDevtoolTargetsMessage | AttachToTargetMessage | ListDevToolTargetsMessage | ConnectedToTargetMessage | StartCaptureMessage
