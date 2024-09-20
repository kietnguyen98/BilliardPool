import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

export class LoaderController {
  constructor() {
    this.fbxLoader = new FBXLoader();
    this.objLoader = new OBJLoader();
    this.gltfLoader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
  }

  loadFbxModel(modelUrl, onloadCallback) {
    this.fbxLoader.load(
      modelUrl,
      onloadCallback,
      (xhr) => {
        console.log(
          `loading model<${modelUrl}> - status: ${
            (xhr.loaded / xhr.total) * 100
          }% loaded`
        );
      },
      (error) => {
        console.log(`loading model<${modelUrl}> - error happened: ` + error);
      }
    );
  }

  loadObjModel(modelUrl, onloadCallback) {
    this.objLoader.load(
      modelUrl,
      onloadCallback,
      (xhr) => {
        console.log(
          `loading model<${modelUrl}> - status: ${
            (xhr.loaded / xhr.total) * 100
          }% loaded`
        );
      },
      (error) => {
        console.log(`loading model<${modelUrl}> - error happened: ` + error);
      }
    );
  }

  loadGlbModel(modelUrl, onloadCallback) {
    this.gltfLoader.load(
      modelUrl,
      onloadCallback,
      (xhr) => {
        console.log(
          `loading model<${modelUrl}> - status: ${
            (xhr.loaded / xhr.total) * 100
          }% loaded`
        );
      },
      (error) => {
        console.log(`loading model<${modelUrl}> - error happened: ` + error);
      }
    );
  }

  loadTexture(textureUrl, onloadCallback) {
    this.textureLoader.load(
      textureUrl,
      onloadCallback,
      (xhr) => {
        console.log(
          `loading model<${textureUrl}> - status: ${
            (xhr.loaded / xhr.total) * 100
          }% loaded`
        );
      },
      (error) => {
        console.log(`loading model<${textureUrl}> - error happened: ` + error);
      }
    );
  }
}
