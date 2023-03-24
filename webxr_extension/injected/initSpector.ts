import '../spector.bundle.func.js'

window.onload = () => {
    ; (window as any).spectorBundleHook();
    ; (window as any)._spector = new (window as any).SPECTOR.Spector({ enableXRCapture: true });
    ; (window as any)._spector.displayUI();
}
