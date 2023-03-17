import '../spector.bundle.func.js'

window.onload = () => {
	; (window as any).spectorBundleHook();
	; (window as any)._spector = new (window as any).SPECTOR.Spector();
	; (window as any)._spector.displayUI();
}
