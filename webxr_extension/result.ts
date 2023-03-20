import localforage from 'localforage';

var ui = null;

window.addEventListener("DOMContentLoaded", function () {
	ui = new (window as any).SPECTOR.EmbeddedFrontend.ResultView();
	ui.display();

	// On first load collect and display the capture from the background page.
	localforage.getItem('capture').then((capture) => {
		addCapture(capture);
		localforage.removeItem('capture');
	})
});

const addCapture = function (capture) {
	if (ui && capture) {
		ui.addCapture(capture);
	}
}
