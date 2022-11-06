
import { CreateCategoryDto } from "../dtos/create_category.dto";
import { Category } from "../models/category.model";
import { validate } from "class-validator";

interface ICategory {
    name: string,
    description?: string
}

interface ICategories {
    count: number,
    results: Category[]
}

class CategoriesService {

    public getCategories = async (): Promise<ICategories> => {

        const searchAllCategories = await Category.findAndCountAll({ attributes: ['id', 'name', 'description'], 
                                                                     order: [['id', 'ASC']] });

        if (searchAllCategories.count === 0) throw new Error('There are no categories added!');
        
        return {
            count: searchAllCategories.count,
            results: searchAllCategories.rows
        };
        
    };

    public getCategoryById = async (id: number): Promise<Category> => {

        const searchCategory = await Category.findOne({ attributes: ['id', 'name', 'description'],
                                                        where: { id }});

        if (searchCategory === null) throw new Error('Category is not exists!');

        return searchCategory;

    };

    public getCategoryByName = async (name: string): Promise<Category | null> => {

        const searchCategory = await Category.findOne({ attributes: ['id', 'name', 'description'],
                                                        where: { name }});

        return searchCategory;

    };

    public validationCategory = async (category: CreateCategoryDto): Promise<CreateCategoryDto> => {
        
        const errors = await validate(category).then(errors => {
            
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

        const existsCategory = await this.getCategoryByName(category.name!);

        if (existsCategory !== null) throw new Error('The category already exists!');

        return category;

    };

}

export default new CategoriesService();
