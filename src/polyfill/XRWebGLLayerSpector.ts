export let XRWebGLLayerSpector = class {
    constructor(session: any,
        context: any,
        layerInit?: any) {
            // no op
            // if we don't have layer support, this class remains empty.
        }
};
if ((window as any).XRWebGLLayer) {
    XRWebGLLayerSpector = class extends XRWebGLLayer {
        private glContext: WebGLRenderingContext | WebGL2RenderingContext;
        constructor(
            session: XRSession,
            context: WebGLRenderingContext | WebGL2RenderingContext,
            layerInit?: XRWebGLLayerInit
        ) {
            super(session, context, layerInit);
            this.glContext = context;
        }

        public getContext() {
            return this.glContext;
        }
    };
}
