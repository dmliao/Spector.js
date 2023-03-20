new Promise((fulfill, reject) => {
	// this is a pure JS rather than TS file because any transpilation that causes
	// the promise to not be the top-level object will cause runtime.evaluate to fail.
	const onCaptureReturn = (capture) => {
		window._spector.onCapture.remove(onCaptureReturn);
		fulfill(capture);
	}
	const onError = (error) => {
		window._spector.onError.remove(onError);
		reject(error);
	}

	// $strings should be replaced by values in service-worker.ts
	window._spector.captureContext(window._spector.getXRContext(),
		$COMMAND_COUNT, $QUICK_CAPTURE, $FULL_CAPTURE);
	window._spector.onCapture.add(onCaptureReturn);
	window._spector.onError.add(onError);
})
