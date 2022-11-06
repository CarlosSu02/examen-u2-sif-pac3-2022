
import { Request, Response } from "express";
import { Word } from "../models/word.model";
import { CreateWordDto } from "../dtos/create_word.dto";
import { plainToClass } from "class-transformer";
import wordsService from "../services/words.service";

const words = [
    {
        name: 'Bananos',
        categoryId: 1
    },
    {
        name: 'Fresa',
        categoryId: 1
    },    
    {
        name: 'Cereza',
        categoryId: 1
    },    
    {
        name: 'Piña',
        categoryId: 1
    },    
    {
        name: 'Mango',
        categoryId: 1
    },    
    {
        name: 'Sandia',
        categoryId: 1
    },    
    {
        name: 'Manzana',
        categoryId: 1
    },
    {
        name: 'Martillo',
        categoryId: 2
    },
    {
        name: 'Silla',
        categoryId: 2
    },
    {
        name: 'Sierra',
        categoryId: 2
    },
    {
        name: 'Vaso',
        categoryId: 2
    },
    {
        name: 'Destornillador',
        categoryId: 2
    },
    {
        name: 'Libro',
        categoryId: 2
    },
    {
        name: 'Comer',
        categoryId: 3
    },
    {
        name: 'Dormir',
        categoryId: 3
    },
    {
        name: 'Sentarse',
        categoryId: 3
    },
    {
        name: 'Caminar',
        categoryId: 3
    },
    {
        name: 'Saltar',
        categoryId: 3
    },
    {
        name: 'Escuchar',
        categoryId: 3
    },
    {
        name: 'Honduras',
        categoryId: 4
    },
    {
        name: 'Alemania',
        categoryId: 4
    },
    {
        name: 'Nicaragua',
        categoryId: 4
    },
    {
        name: 'España',
        categoryId: 4
    },
    {
        name: 'Dinamarca',
        categoryId: 4
    },
    {
        name: 'Leon',
        categoryId: 5
    },
    {
        name: 'Gato',
        categoryId: 5
    },
    {
        name: 'Oso',
        categoryId: 5
    },
    {
        name: 'Perro',
        categoryId: 5
    },
    {
        name: 'Serpiente',
        categoryId: 5
    },
    {
        name: 'Abeja',
        categoryId: 5
    },
    {
        name: 'Mariposa',
        categoryId: 5
    },
    {
        name: 'Azul',
        categoryId: 6
    },
    {
        name: 'Morado',
        categoryId: 6
    },
    {
        name: 'Celeste',
        categoryId: 6
    },
    {
        name: 'Amarillo',
        categoryId: 6
    },
    {
        name: 'Anaranjado',
        categoryId: 6
    },
    {
        name: 'Verde',
        categoryId: 6
    }
];

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

    // Insert words from Array
    public createWordsFromArray = async () => {

        try {

            const countWords = await Word.findAndCountAll().then(info => info.count);

            if (countWords === 0) {

                words.forEach(async (word) => {

                    const createWordDto = plainToClass(CreateWordDto, word);      
                    const validatedWord = await wordsService.validationWord(createWordDto);

                    await Word.create({

                        ...validatedWord

                    });

                });

            }
            
        } catch (error) {
            
            (error instanceof Error) ? console.log('Errors: ', error.message) : console.log(String(error));
   
        }

    };

}

export default new WordController();
