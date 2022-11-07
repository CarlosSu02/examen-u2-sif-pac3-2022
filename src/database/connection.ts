
import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import { Category } from '../models/category.model';
import { Word } from '../models/word.model';
import { Statistic } from '../models/game.model';

class Connection {

    public connection: Sequelize;

    constructor() {

        this.connection = new Sequelize({
            database: process.env.PG_DATABASE,
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD, 
            host: process.env.PG_HOST,
            dialect: 'postgres',
            logging: false,
            models: [
                Category,
                Word,
                Statistic
            ]
        });

    }

}

export default Connection;
