new Promise((fulfill, reject) => {
	if (window._spector) {
		fulfill(true);
	}
	fulfill(false);
});