import * as THREE from "three";


export class Application {
    rootElement: HTMLElement;
    renderer: THREE.Renderer;
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    FOV: number;
    currentTime: number;
    GRID_HEIGHT: number;
    GRID_WIDTH: number;
    GRID_DEPTH: number;
    PARTICLES_PER_CELL: number;

    constructor() {
        this.currentTime = Date.now();
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
        this.camera.position.set( 0, 0, 100 );
        this.camera.lookAt( 0, 0, 0 );
        

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.rootElement = document.getElementById("root");
        this.rootElement.appendChild( this.renderer.domElement );

        this.constructScene();
        this.wireUpEventListeners();
        this.animate();
    }

    constructScene() {
        var light = new THREE.AmbientLight("ffffff", 10);
        this.scene.add(light);

        //create a blue LineBasicMaterial
        var material = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
        var geometry = new THREE.BoxGeometry(10, 10, 10);
        var cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );
    }

    wireUpEventListeners() {
        window.addEventListener("resize", () => {
            this.rootElement.innerHTML = "";
            this.renderer.setSize( window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            document.body.appendChild(this.renderer.domElement);
        })
    }

    animate() {
        var now = Date.now();
        var deltaTime = now - this.currentTime;
        this.currentTime = now;
        this.scene.rotateY(deltaTime * 0.0001);
        this.scene.rotateX(deltaTime * 0.0001);
        requestAnimationFrame(() => this.animate());
        this.renderer.render( this.scene, this.camera );
    }
}