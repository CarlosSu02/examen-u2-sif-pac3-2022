
import { Request, Response } from 'express';
import categoriesService from '../services/categories.service';
import { plainToClass } from 'class-transformer';
import { CreateCategoryDto } from '../dtos/create_category.dto';
import { Category } from '../models/category.model';
import wordsService from '../services/words.service';
import { Word } from '../models/word.model';

const categories = [
    {
        name: 'frutas',
        description: 'aqui se encuentran las frutas.'
    },
    {
        name: 'objetos',
        description: 'aqui se encuentran los objetos.'
    },
    {
        name: 'verbos',
        description: 'aqui se encuentran los verbos.'
    },
    {
        name: 'paises',
        description: 'aqui se encuentran los paises.'
    },
    {
        name: 'animales',
        description: 'aqui se encuentran los animales.'
    },
    {
        name: 'colores',
        description: 'aqui se encuentran los colores.'
    },

];

class CategoryController {

    public getCategories = async (req: Request, res: Response): Promise<Response> => {
    
        try {

            const categories = await categoriesService.getCategories();
            
            return res.status(200).send(categories);
            
        } catch (error) {
            
            return (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
            
        }

    };
    
    public getCategoryById = async (req: Request, res: Response): Promise<Response> => {
    
        try {

            const { id } = req.params;

            const category: Category = await categoriesService.getCategoryById(+id);

            return res.status(200).send(category);
            
        } catch (error) {

            return (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));

        }

    };

    public getCategoryWords = async (req: Request, res: Response): Promise<Response> => {
    
        try {

            const { id } = req.params;

            const words = await wordsService.getWordsCategory(+id);
            
            return res.status(200).send(words);
            
        } catch (error) {
            
            return (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
            
        }

    };

    public createCategory = async (req: Request, res: Response): Promise<Response> => {
    
        try {

            const payload = req.body;

            const createCategoryDto: CreateCategoryDto = plainToClass(CreateCategoryDto, payload);      
            const validatedCategory: CreateCategoryDto = await categoriesService.validationCategory(createCategoryDto);

            const newCategory: Category = await Category.create({

                ...validatedCategory

            });

            return res.status(201).send(newCategory);
            
        } catch (error) {

            return (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));

        }

    };

    public updateCategory = async (req: Request, res: Response): Promise<Response> => {
    
        try {

            const { id } = req.params;
            const payload: any = req.body;

            const category: Category = await categoriesService.getCategoryById(+id);

            const createCategoryDto: CreateCategoryDto = plainToClass(CreateCategoryDto, payload);      
            const validatedCategory: CreateCategoryDto = await categoriesService.validationCategory(createCategoryDto);

            category.set(validatedCategory);
            await category.save();

            return res.status(201).send(category);
            
        } catch (error) {

            return (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));

        }

    };

    public deleteCategory = async (req: Request, res: Response): Promise<Response> => {
    
        try {

            const { id } = req.params;

            const existsCategory: Category = await categoriesService.getCategoryById(+id);
            
            await Word.destroy({ where: { "categoryId": id } });
    
            await Category.destroy({ where: { id } });

            return res.status(200).send(`The category '${existsCategory.name} (${id})' deleted successfully!`)

        } catch (error) {
            
            return (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
           
        }

    };

    // Insert categories from Array
    public createCategoriesFromArray = async () => {

        try {

            const countCategories: number = await Category.findAndCountAll().then(info => info.count);

            if (countCategories === 0) {

                console.log(`\nThis is the first run of the application \nInsert categories in database from Array`);

                categories.forEach(async (category) => {

                    const createCategoryDto: CreateCategoryDto = plainToClass(CreateCategoryDto, category);      
                    const validatedCategory: CreateCategoryDto = await categoriesService.validationCategory(createCategoryDto);

                    await Category.create({

                        ...validatedCategory

                    });

                });

            }
            
        } catch (error) {
            
            (error instanceof Error) ? console.log('Errors: ', error.message) : console.log(String(error));
   
        }

    };

}

export default new CategoryController();
