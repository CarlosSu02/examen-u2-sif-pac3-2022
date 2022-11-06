
import { Request, Response } from "express";
import { Word } from "../models/word.model";
import { CreateWordDto } from "../dtos/create_word.dto";
import { plainToClass } from "class-transformer";
import wordsService from "../services/words.service";

class WordController {

    public getWords = async (req: Request, res: Response) => {
    
        try {

            const words = await wordsService.getWords();
            
            res.status(200).send(words);
                        
        } catch (error) {
            
            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
            
        }

    };
    
    public getWordById = async (req: Request, res: Response) => {
    
        try {
            const { id } = req.params;

            const word = await wordsService.getWordById(+id);

            res.status(200).send(word);

        } catch (error) {

            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));

        }

    };

    public createWord = async (req: Request, res: Response) => {
    
        try {
         
            const payload = req.body;

            const createWordDto = plainToClass(CreateWordDto, payload);      
            const validatedWord = await wordsService.validationWord(createWordDto);

            const newWord = await Word.create({

                ...validatedWord

            });

            res.status(201).send(newWord);

        } catch (error) {

            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));

        }

    };

    public updateWord = async (req: Request, res: Response) => {
    
        try {
         
            const { id } = req.params;
            const payload = req.body;

            const category = await wordsService.getWordById(+id);

            const createWordDto = plainToClass(CreateWordDto, payload);      
            const validatedWord = await wordsService.validationWord(createWordDto);

            category.set(validatedWord);
            await category.save();

            res.status(201).send(category);

        } catch (error) {

            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));

        }

    };

    public deleteWord = async (req: Request, res: Response) => {
    
        try {
            
            const { id } = req.params;

            const existsWord = await wordsService.getWordById(+id);
            
            await Word.destroy({ where: { id } });

            res.status(200).send(`The category '${existsWord.name} (${id})' deleted successfully!`)

        } catch (error) {
            
            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
           
        }

    };

}

export default new WordController();
