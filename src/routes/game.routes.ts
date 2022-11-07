
import { Router } from "express";
import gameController from "../controllers/game.controller";

class GameRoutes {

    router = Router();

    constructor() {
    
        this.initRoutes();
    
    };

    initRoutes() {

        this.router.get('/ahorcado', gameController.getGameAhorcado);

    };

}

export default new GameRoutes();
