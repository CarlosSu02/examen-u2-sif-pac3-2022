
import { Word } from "../models/word.model";
import { validate } from "class-validator";
import { CreateWordDto } from "../dtos/create_word.dto";
import categoriesService from "./categories.service";
import { Category } from "../models/category.model";
import { Statistic } from "../models/game.model";

interface IWords {
    categoryName?: string,
    count: number,
    results: Word[]
}

class GameService {

    public getStatistic = async (): Promise<Statistic | null> => {

        const searchStatistic = await Statistic.findOne({ attributes: ['id', 'word', 'progress', 'state', 'attempts', 'completed'], 
                                                          where: { "completed": false } });

        if (searchStatistic === null) return searchStatistic;
        
        return searchStatistic.dataValues;
        
    };

}

export default new GameService();
