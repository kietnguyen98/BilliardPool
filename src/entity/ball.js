import * as THREE from "three";
import { RigidBodyController } from "../class/rigid-body-controller";

import { GLOBAL_CONSTANTS } from "../constants";

const { IS_DEBUG, BALL_RADIUS } = GLOBAL_CONSTANTS;

const BALL_TEXTURES = [
  "textures/001.jpg",
  "textures/002.jpg",
  "textures/003.jpg",
  "textures/004.jpg",
  "textures/005.jpg",
  "textures/006.jpg",
  "textures/007.jpg",
  "textures/008.jpg",
  "textures/009.jpg",
  "textures/010.jpg",
  "textures/011.jpg",
  "textures/012.jpg",
  "textures/013.jpg",
  "textures/014.jpg",
  "textures/015.jpg",
  // cue ball
  "textures/cue.jpeg",
];

export class Ball {
  constructor(gameController, ballIndex, position) {
    this.ballIndex = ballIndex;
    this.gameController = gameController;
    // temporary transform use for sync physics with threejs mesh when update ball
    this.tempTransform = new this.gameController.ammoInstance.btTransform();
    // graphic mesh - use for three to render
    this.gameController.loaderController.loadTexture(
      BALL_TEXTURES[this.ballIndex],
      (texture) => {
        this.texture = texture;
        this.geometry = new THREE.SphereGeometry(BALL_RADIUS, 32, 16);
        this.material = new THREE.MeshBasicMaterial({
          map: texture,
        });
        this.threeMesh = new THREE.Mesh(this.geometry, this.material);
        this.threeMesh.castShadow = true;
        this.threeMesh.receiveShadow = true;
        this.gameController.screenController.scene.add(this.threeMesh);
        this.threeMesh.position.set(position.x, position.y, position.z);

        this.threeMesh.applyQuaternion(new THREE.Quaternion(0, 1, 0, -1));
        this.threeMesh.applyQuaternion(new THREE.Quaternion(1, 0, 0, -1));

        // rigid body mesh - use for debug
        this.rigidBodyMesh = new THREE.Mesh(
          this.geometry,
          new THREE.MeshStandardMaterial({ color: 0xdd5746, wireframe: true })
        );
        if (IS_DEBUG) {
          this.gameController.screenController.scene.add(this.rigidBodyMesh);
        }
        this.rigidBodyMesh.position.copy(this.threeMesh.position);
        this.rigidBodyMesh.quaternion.copy(this.threeMesh.quaternion);

        // physics rigid body
        this.rigidBodyController = new RigidBodyController(this.gameController);
        this.rigidBodyController.createSphere({
          mass: 1,
          position: this.rigidBodyMesh.position,
          quaternion: this.rigidBodyMesh.quaternion,
          radius: BALL_RADIUS,
        });

        this.gameController.physicsController.physicsWorld.addRigidBody(
          this.rigidBodyController.body
        );
      }
    );
  }

  update(deltaTime) {
    if (this.rigidBodyController) {
      this.rigidBodyController.body
        .getMotionState()
        .getWorldTransform(this.tempTransform);
      const position = this.tempTransform.getOrigin();
      const quaternion = this.tempTransform.getRotation();
      this.threeMesh.position.set(position.x(), position.y(), position.z());
      this.threeMesh.quaternion.set(
        quaternion.x(),
        quaternion.y(),
        quaternion.z(),
        quaternion.w()
      );
      if (IS_DEBUG) {
        this.rigidBodyMesh.position.set(
          position.x(),
          position.y(),
          position.z()
        );
        this.rigidBodyMesh.quaternion.set(
          quaternion.x(),
          quaternion.y(),
          quaternion.z(),
          quaternion.w()
        );
      }
    }
  }
}
