/**
 * This is injected at the beginning of the build process to add the criRequest function
 * that is needed for chrome-remote-interface to run: https://github.com/cyrus-and/chrome-remote-interface#browser-usage
 * However, the service worker doesn't have a window object, so we create a fake one there and use the real one elsewhere
 */

let fakeWindow = {};
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
			method: 'get'
		});
		const responseText = await res.text();
		callback(null, responseText);
	} catch (e) {
		callback(e, null);
	}
}

export{ fakeWindow as window };