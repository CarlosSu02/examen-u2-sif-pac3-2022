
import { Router } from "express";
import wordController from "../controllers/word.controller";

class CategoriesRoutes {

    router = Router();

    constructor() {
    
        this.initRoutes();
    
    };

    initRoutes() {

        this.router.get('/words', wordController.getWords);
        this.router.get('/words/:id', wordController.getWordById);
        this.router.post('/words', wordController.createWord);
        this.router.patch('/words/:id', wordController.updateWord);
        this.router.delete('/words/:id', wordController.deleteWord);

    };

}

export default new CategoriesRoutes();
