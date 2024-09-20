import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLOBAL_CONSTANTS } from "../constants";

const { IS_DEBUG } = GLOBAL_CONSTANTS;

export class ScreenController {
  constructor(canvasContainer) {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.domElement.id = "canvas";
    canvasContainer.appendChild(this.renderer.domElement);
    this.screenWidth = window.innerWidth - 32;
    this.screenHeight = window.innerHeight - 32;
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.screenWidth / this.screenHeight,
      1,
      100
    );
    this.camera.position.z = 2;
    this.camera.position.y = 2;
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);

    // setup screen
    this.renderer.setSize(this.screenWidth, this.screenHeight);
    // this.scene.background = new THREE.Color(0xbfe3dd);
    this.scene.environment = this.pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;

    // init handle resize event
    this.initResizeEvent();

    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    this.orbitControls.enableDamping = true;

    this.initDirLight();
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    this.orbitControls.update();
  }

  initResizeEvent() {
    const onWindowResize = () => {
      this.screenWidth = window.innerWidth - 32;
      this.screenHeight = window.innerHeight - 32;
      this.camera.aspect = this.screenWidth / this.screenHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.screenWidth, this.screenHeight);
    };

    window.addEventListener("resize", onWindowResize, false);
  }

  initDirLight() {
    this.dirLight = new THREE.DirectionalLight(0xfdde55, 3);
    // this.dirLight.color.setHSL(0.1, 1, 0.95);
    this.dirLight.position.set(0, 1.5, 0);
    this.scene.add(this.dirLight);

    this.dirLight.castShadow = true;

    this.dirLight.shadow.mapSize.width = 64;
    this.dirLight.shadow.mapSize.height = 64;

    const d = 5;

    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;

    this.dirLight.shadow.camera.far = 100;
    this.dirLight.shadow.bias = -0.0001;

    // helper
    const helper = new THREE.DirectionalLightHelper(this.dirLight, 1);
    if (IS_DEBUG) {
      this.scene.add(helper);
    }
  }
}
