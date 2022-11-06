
import { Word } from "../models/word.model";
import { validate } from "class-validator";
import { CreateWordDto } from "../dtos/create_word.dto";
import categoriesService from "./categories.service";

interface IWords {
    count: number,
    results: Word[]
}

class WordsService {

    public getWords = async (): Promise<IWords> => {

        const searchAllWords = await Word.findAndCountAll({ attributes: ['id', 'name', 'categoryId'], 
                                                            order: [['id', 'ASC']] });

        if (searchAllWords.count === 0) throw new Error('There are no words added!');
        
        return {
            count: searchAllWords.count,
            results: searchAllWords.rows
        };
        
    };

    public getWordById = async (id: number): Promise<Word> => {

        const searchWord = await Word.findOne({ attributes: ['id', 'name', 'categoryId'],
                                                where: { id }});

        if (searchWord === null) throw new Error('Word is not exists!');

        return searchWord;

    };

    public getWordByName = async (name: string): Promise<Word | null> => {

        const searchWord = await Word.findOne({ attributes: ['id', 'name', 'categoryId'],
                                                where: { name }});

        return searchWord;

    };

    public getWordsCategory = async (id: number): Promise<IWords> => {

        const searchAllWordsCategory = await Word.findAndCountAll({ attributes: ['id', 'name', 'categoryId'], 
                                                            where: { "categoryId": id },
                                                            order: [['id', 'ASC']] });

        if (searchAllWordsCategory.count === 0) throw new Error('There are no words added!');
        
        return {
            count: searchAllWordsCategory.count,
            results: searchAllWordsCategory.rows
        };
        
    };

    public validationWord = async (word: CreateWordDto): Promise<CreateWordDto> => {
        
        const errors = await validate(word).then(errors => {
            
            if (errors.length > 0) {

                let constraints: any = [];

                errors.forEach(err => {

                    constraints.push({ 

                        'Property': err.property, 
                        'Errors': err.constraints 

                    });
                  
                });

                return constraints;

            }

        });

        if (typeof errors !== 'undefined') throw new Error(JSON.stringify(errors)); 

        const existsWord = await this.getWordByName(word.name!);

        if (existsWord !== null) throw new Error('The word already exists in other category!');

        await categoriesService.getCategoryById(word.categoryId!);

        return word;

    };

}

export default new WordsService();
