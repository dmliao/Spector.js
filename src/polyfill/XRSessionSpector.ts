import { XRWebGLLayerSpector } from "./XRWebGLLayerSpector";

export class XRSessionSpector extends XRSession {
    private glContext: WebGLRenderingContext | WebGL2RenderingContext;

    public async updateRenderState(
        renderStateInit?: XRRenderStateInit
    ): Promise<void> {
        if (renderStateInit.baseLayer) {
            const polyfilledBaseLayer =
                renderStateInit.baseLayer as XRWebGLLayerSpector;
            this.glContext = polyfilledBaseLayer.getContext();
        }

        if (renderStateInit.layers) {
            for (const layer of renderStateInit.layers) {
                const layerAny: any = layer;
                if (layerAny.glContext) {
                    this.glContext = layerAny.glContext;
                }
            }
        }
        return super.updateRenderState(renderStateInit);
    }

    public getContext() {
        return this.glContext;
    }
}
