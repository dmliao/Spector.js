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
	target: any
}

export type StartCaptureMessage = {
	type: 'startCapture',
	quickCapture?: boolean,
	fullCapture?: boolean,
	captureOnLoadCount?: number,
	captureOnLoadTransient?: boolean,
}

// messages from service worker to popup
export type ListDevToolTargetsMessage = {
	type: 'listOfTargets',
	targets: Record<string, any>[]
}

export type ConnectedToTargetMessage = {
	type: 'connectedToTarget',
	target: any
}

export type AnyMessage = ErrorMessage | GetDevtoolTargetsMessage | AttachToTargetMessage | ListDevToolTargetsMessage | ConnectedToTargetMessage | StartCaptureMessage
