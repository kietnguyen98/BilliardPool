export class PhysicsController {
  constructor(gameController) {
    this.gameController = gameController;
    this.collisionConfiguration =
      new this.gameController.ammoInstance.btDefaultCollisionConfiguration();
    this.dispatcher =
      new this.gameController.ammoInstance.btCollisionDispatcher(
        this.collisionConfiguration
      );
    this.overlappingPairCache =
      new this.gameController.ammoInstance.btDbvtBroadphase();
    this.solver =
      new this.gameController.ammoInstance.btSequentialImpulseConstraintSolver();
    this.physicsWorld =
      new this.gameController.ammoInstance.btDiscreteDynamicsWorld(
        this.dispatcher,
        this.overlappingPairCache,
        this.solver,
        this.collisionConfiguration
      );
    this.physicsWorld.setGravity(
      new this.gameController.ammoInstance.btVector3(0, -10, 0)
    );
  }

  update(deltaTime) {
    this.physicsWorld.stepSimulation(deltaTime, 10);
  }
}
