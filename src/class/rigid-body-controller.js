export class RigidBodyController {
  constructor(gameController) {
    this.gameController = gameController;
  }

  createBox({
    mass,
    position,
    quaternion,
    size,
    rollingFriction,
    friction,
    restitution,
  }) {
    this.transform = new this.gameController.ammoInstance.btTransform();
    this.transform.setIdentity();
    this.transform.setOrigin(
      new this.gameController.ammoInstance.btVector3(
        position.x,
        position.y,
        position.z
      )
    );
    this.transform.setRotation(
      new this.gameController.ammoInstance.btQuaternion(
        quaternion.x,
        quaternion.y,
        quaternion.z,
        quaternion.w
      )
    );
    this.motionState = new Ammo.btDefaultMotionState(this.transform);

    const btSize = new this.gameController.ammoInstance.btVector3(
      size.x * 0.5,
      size.y * 0.5,
      size.z * 0.5
    );
    this.shape = new this.gameController.ammoInstance.btBoxShape(btSize);
    this.shape.setMargin(0.001);

    // inertia = quan tinh
    this.inertia = new this.gameController.ammoInstance.btVector3(0, 0, 0);
    this.shape.calculateLocalInertia(mass, this.inertia);

    this.bodyInfo =
      new this.gameController.ammoInstance.btRigidBodyConstructionInfo(
        mass,
        this.motionState,
        this.shape,
        this.inertia
      );

    this.body = new this.gameController.ammoInstance.btRigidBody(this.bodyInfo);

    this.gameController.ammoInstance.destroy(btSize);

    this.body.setRollingFriction(rollingFriction);
    this.body.setFriction(friction);
    this.body.setRestitution(restitution);
  }

  createSphere({ mass, position, quaternion, radius }) {
    this.transform = new this.gameController.ammoInstance.btTransform();
    this.transform.setIdentity();
    this.transform.setOrigin(
      new this.gameController.ammoInstance.btVector3(
        position.x,
        position.y,
        position.z
      )
    );
    this.transform.setRotation(
      new this.gameController.ammoInstance.btQuaternion(
        quaternion.x,
        quaternion.y,
        quaternion.z,
        quaternion.w
      )
    );
    this.motionState = new Ammo.btDefaultMotionState(this.transform);

    this.shape = new this.gameController.ammoInstance.btSphereShape(radius);
    this.shape.setMargin(0.001);

    // inertia = quan tinh
    this.inertia = new this.gameController.ammoInstance.btVector3(0, 0, 0);
    this.shape.calculateLocalInertia(mass, this.inertia);

    this.bodyInfo =
      new this.gameController.ammoInstance.btRigidBodyConstructionInfo(
        mass,
        this.motionState,
        this.shape,
        this.inertia
      );

    this.body = new this.gameController.ammoInstance.btRigidBody(this.bodyInfo);

    this.body.setFriction(1);
    this.body.setRollingFriction(0.0001);
    this.body.setRestitution(0.85);
    this.body.setDamping(0.01, 0.02);
  }
}
