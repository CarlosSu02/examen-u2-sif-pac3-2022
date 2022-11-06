
import express, { json } from "express";
import cors from "cors";
import Connection from "./database/connection";
import categoriesRoutes from "./routes/categories.routes";

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
        
                console.log('Connection has been established successfully.')
            
            })
            .catch((error) => {

                console.error('Unable to connect to the database: ', error);
            
            });

    };

    routes = () => {

        this.express.use('/api', categoriesRoutes.router);

    };

    listen = (PORT: number) => {

        this.express.listen(PORT, () => {

            console.log(`Server is running on port: ${PORT}, http://localhost:${PORT} \n`);
            
        })

    };

}

export default new App();
