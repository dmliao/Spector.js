export let XRWebGLBindingSpector = class {
    constructor(session: any, context: any) {
        // no op
        // if we don't have binding support, this class remains empty.
    }
};

if ((window as any).XRWebGLBinding) {
    XRWebGLBindingSpector = class extends XRWebGLBinding {
        private glContext: WebGLRenderingContext | WebGL2RenderingContext;
        constructor(session: XRSession, context: WebGLRenderingContext) {
            super(session, context);
            this.glContext = context;
        }

        public createProjectionLayer(init?: XRProjectionLayerInit): XRProjectionLayer {
            const layer = super.createProjectionLayer(init);
            (layer as any).glContext = this.glContext;
            return layer;
        }
    };
}
