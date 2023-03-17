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

  // foreground.ts
  console.log("This prints to the console of the page (injected only if the page url matched)");
})();
