var renderCanvas = document.getElementById('renderCanvas');

var createScene = async function () {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(renderCanvas, true);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", { segments: 16, diameter: 2 }, scene);
    sphere.position.y = 1;

    const env = scene.createDefaultEnvironment();

    // here we add XR support
    const xr = await scene.createDefaultXRExperienceAsync({
        floorMeshes: [env.ground],
    });

    return scene;
};

var engine = new BABYLON.Engine(renderCanvas);
createScene(engine, renderCanvas).then((scene) => {

    engine.runRenderLoop(function () {
        scene.render();
    });

});
