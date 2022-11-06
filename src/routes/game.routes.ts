
import { Router } from "express";
import gameController from "../controllers/game.controller";

class GameRoutes {

    router = Router();

    constructor() {
    
        this.initRoutes();
    
    };

    initRoutes() {

        this.router.get('/ahorcado', gameController.getGameAhorcado);
        // this.router.post('/ahorcado', gameController.createCategory);

    };

}

export default new GameRoutes();
