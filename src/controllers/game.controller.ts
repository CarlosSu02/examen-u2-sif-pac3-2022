
import { Request, Response } from 'express';
import categoriesService from '../services/categories.service';
import wordsService from '../services/words.service';
import { Statistic } from '../models/game.model';
import gameService from '../services/game.service';

interface IStatistic {
    progress: string,
    state: string,
    attempts: number,
    completed: boolean,
    message?: string
}

class GameController {

    public getGameAhorcado = async (req: Request, res: Response) => {
    
        try {

            const word = (req.body.word).toLowerCase();
            const statistic = await this.getStatistic();

            if (statistic === null) {

                const newGame = await this.newGame();

                const sendGame: IStatistic = {
                    ...newGame
                }

                return res.status(200).send(sendGame);

            }

            const id = statistic.id!;
            const secretWord = (statistic.word!).toLowerCase();
            const showWord = (statistic.progress!).replace(/\s+/g, '').split('');

            let stateGame = statistic.state!;
            let completed = statistic.completed!;
            let attempts = statistic.attempts!;
            let message = 'Enter a new letter!';
            let state = 0;

            if (word.length > 1) {

                if (secretWord === word) {

                    const sendGame: IStatistic = {
                        progress: secretWord.split('').join(' '),
                        state: 'Winner',
                        attempts: attempts,
                        completed: true,
                        message: 'Send a new request to start a new game!'
                    }
        
                    await this.updateStatistic(
                        id,
                        {
                            word: statistic.word!,
                            ...sendGame
                        }
                    );

                    return res.status(200).send(sendGame);
                    
                }

            }

            for (let i = 0; i < secretWord!.length; i++) {
                
                if (secretWord[i] === word) {
                    
                    showWord[i] = word;
                    state++;

                }

            }

            const updateShowWord = showWord.join(' ');

            if (state === 0) attempts--;
            if (attempts === 0) completed = true, stateGame = 'Lost', message = `Send a new request to start a new game! The word was ${secretWord}...`;
            if (secretWord === updateShowWord.toString().replace(/\s+/g, '')) completed = true, stateGame = 'Winner', message = 'Send a new request to start a new game!';

            const sendGame: IStatistic = {
                progress: updateShowWord,
                state: stateGame,
                attempts: attempts,
                completed: completed,
                message
            }

            await this.updateStatistic(
                id,
                {
                    word: statistic.word!,
                    ...sendGame
                }
            );
 
            return res.status(200).send(sendGame);
            
        } catch (error) {
            
            return (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
            
        }

    };
    
    public newGame = async (): Promise<string | any> => {

        try {
            
            const word: string = await this.getWordGame();
            const convertWord = [];
            let showWord: string = '';
            let attempts: number;
            
            for (let i = 0; i < word.length; i++) {
                
                convertWord[i] = '_';
            
            }

            showWord = convertWord.join(' ');
            
            if (word.length % 2 === 0) {

                attempts = (word.length / 2) + 1;

            }else{

                attempts = (word.length / 2) + 1.5;

            }

            const info = {
                progress: showWord,
                state: 'In progress...',
                attempts,
                completed: false,
                message: 'Enter a letter!'
            }

            await this.createStatistic({
                word,
                ...info
            });

            return info;


        } catch (error) {

            return (error instanceof Error) ? console.log(error.message) : console.log(String(error));

        }

    };

    public getWordGame = async (): Promise<string> => {

        const countCategories: number = await categoriesService.getCategories().then(info => info.count);
        const sortCategory: number =  Math.floor(Math.random() * (countCategories) + 1);    
        
        const gertWordsCategory = await wordsService.getWordsCategory(sortCategory);
        const sortWord: number =  Math.floor(Math.random() * (gertWordsCategory.count) + 1);

        const wordsArray = gertWordsCategory.results.map((word, index) => { 
            
            if ((index + 1) === sortWord) {

                return word.name;
             
            }

        });

        const word = wordsArray.filter((item) => item !== undefined).toString();
    
        return word;

    };

    public getStatistic = async (): Promise<Statistic |  null> => {

        try {
            
            const statistic = await gameService.getStatistic();

            return statistic;
           
        } catch (error) {

            (error instanceof Error) ? console.log(error.message) : console.log(String(error));
            return null;

        }

    }

    public createStatistic = async (object: any) => {
    
        try {
            
            await Statistic.create(object);
           
        } catch (error) {

            return (error instanceof Error) ? console.log(error.message) : console.log(String(error));

        }

    };

    public updateStatistic = async (id: number, object: any) => {
    
        try {

            const statistic = await Statistic.findByPk(id);
            
            statistic?.set({
                word: object.word,
                progress: object.progress,
                state: object.state,
                attempts: object.attempts,
                completed: object.completed
            });
            await statistic?.save();

            return statistic?.dataValues;
           
        } catch (error) {

            return (error instanceof Error) ? console.log(error.message) : console.log(String(error));

        }

    };

}

export default new GameController();
