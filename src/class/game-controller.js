import * as THREE from "three";

// controller
import { LoaderController } from "./loader-controller";
import { ScreenController } from "./screen-controller";
import { PhysicsController } from "./physics-controller";
import { RigidBodyController } from "./rigid-body-controller";
// entities
import { Ball } from "../entity/ball";
// constants
import { GLOBAL_CONSTANTS } from "../constants";
import { shuffle } from "../utils";

const { IS_DEBUG, BALL_POSITION } = GLOBAL_CONSTANTS;

export class GameController {
  constructor(Ammo) {
    this.ammoInstance = Ammo;
    this.canvasContainer = document.querySelector("#threejs");
    this.screenController = new ScreenController(this.canvasContainer);
    this.loaderController = new LoaderController();
    this.physicsController = new PhysicsController(this);
    this.entities = [];
  }

  gameUpdate() {
    if (!this.lastTick) {
      this.lastTick = performance.now();
    } else {
      const diffTime = performance.now() - this.lastTick;
      this.lastTick = performance.now();
      const elapsedTime = diffTime / 1000;

      this.physicsController.update(elapsedTime);
      // update balls
      for (let i = 0; i < this.entities.length; i++) {
        this.entities[i].update(elapsedTime);
      }
    }
  }

  initGameLoop() {
    this.screenController.renderer.setAnimationLoop(() => {
      this.gameUpdate();
      this.screenController.animate();
    });
  }

  initGameEntity() {
    // init table three mesh
    this.loaderController.loadGlbModel(
      "models/tables/table_pool.glb",
      (gltf) => {
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        this.screenController.scene.add(gltf.scene);
      }
    );

    // init ball
    shuffle(BALL_POSITION.DYNAMIC);
    let shuffledBallIndex = 0;
    Array.from({ length: 15 }, (_v, i) => {
      let position = {};
      if (i === 0) {
        position = BALL_POSITION.STATIC[0];
      } else if (i === 7) {
        position = BALL_POSITION.STATIC[1];
      } else {
        position = BALL_POSITION.DYNAMIC[shuffledBallIndex];
        shuffledBallIndex++;
      }

      this.entities.push(new Ball(this, i, position));
    });

    // cue ball
    this.entities.push(new Ball(this, 15, BALL_POSITION.STATIC[2]));

    // init collision bounding box with physics initialize in it
    this.generateBoundingBox();
  }

  generateBox({ size, position, rollingFriction, friction, restitution }) {
    // mesh
    const boxMesh = new THREE.Mesh(
      new THREE.BoxGeometry(size.x, size.y, size.z),
      new THREE.MeshStandardMaterial({ color: 0xdd5746, wireframe: true })
    );
    boxMesh.position.set(position.x, position.y, position.z);
    if (IS_DEBUG) {
      this.screenController.scene.add(boxMesh);
    }

    // physics rigid body
    const boxBodyController = new RigidBodyController(this);
    boxBodyController.createBox({
      mass: 0,
      position: boxMesh.position,
      quaternion: boxMesh.quaternion,
      size: size,
      rollingFriction,
      friction: friction,
      restitution,
    });

    this.physicsController.physicsWorld.addRigidBody(boxBodyController.body);
  }

  generateBoundingBox() {
    // table ground
    this.generateBox({
      size: new THREE.Vector3(1.12, 0.1, 2.24),
      position: new THREE.Vector3(0, 0.3185, 0),
      rollingFriction: 20,
      friction: 1,
      restitution: 0.5,
    });

    // 4 table wall
    this.generateBox({
      size: new THREE.Vector3(0.05, 0.038, 2.065),
      position: new THREE.Vector3(0.5805, 0.388, 0),
      rollingFriction: 0.001,
      friction: 1,
      restitution: 0.8,
    });
    this.generateBox({
      size: new THREE.Vector3(0.05, 0.038, 2.065),
      position: new THREE.Vector3(-0.5805, 0.388, 0),
      rollingFriction: 0.001,
      friction: 1,
      restitution: 0.8,
    });
    this.generateBox({
      size: new THREE.Vector3(0.942, 0.038, 0.05),
      position: new THREE.Vector3(0, 0.388, 1.138),
      rollingFriction: 0.001,
      friction: 1,
      restitution: 0.8,
    });
    this.generateBox({
      size: new THREE.Vector3(0.942, 0.038, 0.05),
      position: new THREE.Vector3(0, 0.388, -1.138),
      rollingFriction: 0.001,
      friction: 1,
      restitution: 0.8,
    });
  }

  init() {
    this.initGameLoop();
    this.initGameEntity();
  }
}
