import "./styles/style.css";
import { GameController } from "./class/game-controller";

// init ammo
window.addEventListener("DOMContentLoaded", async () => {
  Ammo().then(function (AmmoLib) {
    Ammo = AmmoLib;
    // init 3d game world
    const gameController = new GameController(Ammo);
    gameController.init();
  });
});
