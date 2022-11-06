
import express, { json } from "express";
import cors from "cors";
import Connection from "./database/connection";
import categoriesRoutes from "./routes/categories.routes";
import wordRoutes from "./routes/word.routes";
import categoryController from "./controllers/category.controller";
import wordController from "./controllers/word.controller";

class App {

    public express: express.Application;
    public connection: Connection | undefined;

    constructor() {

        this.express = express();
        this.middlewares();

        this.db();
        this.routes();

    }

    middlewares = () => {

        this.express.use(json());
        this.express.use(cors());

    };

    db = () => {
        
        this.connection = new Connection();

        this.connection.connection.sync({ force: false })
            .then(() => {
        
                categoryController.createCategoriesFromArray();
                wordController.createWordsFromArray();
                
                console.log('Connection has been established successfully.');
            
            })
            .catch((error) => {

                console.error('Unable to connect to the database: ', error);
            
            });

    };

    routes = () => {

        this.express.use('/api', categoriesRoutes.router);
        this.express.use('/api', wordRoutes.router);

    };

    listen = (PORT: number) => {

        this.express.listen(PORT, () => {

            console.log(`Server is running on port: ${PORT}, http://localhost:${PORT} \n`);

        })

    };

}

export default new App();
