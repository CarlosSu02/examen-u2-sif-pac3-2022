
import { Word } from "../models/word.model";
import { validate } from "class-validator";
import { Statistic } from "../models/game.model";
import { WordPetitionDto } from "../dtos/word_petition.dto";

class GameService {

    public getStatistic = async (): Promise<Statistic | null> => {

        const searchStatistic = await Statistic.findOne({ attributes: ['id', 'word', 'progress', 'state', 'attempts', 'completed'], 
                                                          where: { "completed": false } });

        if (searchStatistic === null) return searchStatistic;
        
        return searchStatistic.dataValues;
        
    };

    public validationWord = async (word: WordPetitionDto, progress: string): Promise<WordPetitionDto> => {
        
        const errors = await validate(word).then(errors => {
            
            if (errors.length > 0) {

                let constraints: any = [];

                errors.forEach(err => {

                    constraints.push({ 

                        'Property': err.property, 
                        'Errors': err.constraints,
                        'Message': `Enter a new letter to continue the game! Progress '${progress}'`

                    });
                  
                });

                return constraints;

            }

        });

        if (typeof errors !== 'undefined') throw new Error(JSON.stringify(errors)); 

        return word;

    };

}

export default new GameService();
