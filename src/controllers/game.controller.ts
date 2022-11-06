
import { Request, Response } from 'express';
import categoriesService from '../services/categories.service';
import wordsService from '../services/words.service';

import { AsyncLocalStorage } from 'async_hooks';
const asyncLocalStorage: any = new AsyncLocalStorage();

class GameController {

    reqId: number = 0;

    public getGameAhorcado = async (req: Request, res: Response) => {
    
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

            // console.log(attempts);
            
            // console.log(convertWord.join(' '));

            const statusGame = await this.statusGame(word, attempts);

            res.status(200).send({
                attempts,
                word,
                "secret-word": showWord,
                statusGame
            });
            
        } catch (error) {
            
            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
            
        }

    };

    public getWordGame = async (): Promise<string> => {

        const countCategories: number = await categoriesService.getCategories().then(info => info.count);
        const sortCategory: number =  Math.floor(Math.random() * (countCategories) + 1);    
        
        const countWordsCategory: number = await wordsService.getWordsCategory(sortCategory).then(info => info.count);
        const sortWord: number =  Math.floor(Math.random() * (countWordsCategory) + 1);
        
        const word: string = await wordsService.getWordById(sortWord).then(info => info.name!);

        return word;

    };

    performEvenMoreWork = async () => {
        // performing even more work
        console.log('performing work for', asyncLocalStorage.getStore());
        let str = (asyncLocalStorage.getStore());
        return str;
    }

    performSomeWork = async () => {
        // performing some work
        return await this.performEvenMoreWork().then((data) => data);
    }

    statusGame = async(word: string, attempts: number): Promise<any> => { 

        this.reqId++;
        
        const testing = asyncLocalStorage.run('info', () => { 
            
            return this.getData();
            
        });
        console.log('asddsa', testing);

        // console.log(this.reqId);

        if (testing === undefined) {

            let store = new Map();

            asyncLocalStorage.run(store, () => {
                
                store.set("reqId", this.reqId);
                store.set("attempts", attempts);
                store.set("word", word);

                // asyncLocalStorage.getStore().set("intentos", attempts);
                // asyncLocalStorage.getStore().set("word", word);

                // const dataDB = await Category.findAndCountAll().then(data => data.count);
                // console.log(dataDB);
            
                // return ({

                //     'intentos': attempts,
                //     'counter': 'data!.toString()'

                // });
                
                this.getData();

            });

        }
        // this.getData();

        // console.log(store);
        
        if (this.reqId === attempts) this.reqId = 0;

        return 'test';

    };

    getData = () => {

        const info = asyncLocalStorage.getStore();

        console.log(typeof info);

        if (info === 'info') return undefined;

        const reqIdM = info.get('reqId');
        const attemptsM = info.get('attempts');
        const wordM = info.get('word');

        // console.log(reqIdM, attemptsM, wordM);
        // console.log

        return { reqIdM, attemptsM };

    }

}

export default new GameController();
