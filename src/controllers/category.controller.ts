
import { Request, Response } from "express";

class CategoryController {

    public getCategories = (req: Request, res: Response) => {
    
        try {

            res.status(200).send('Hello strange!');
            
        } catch (error) {
            
            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
            
        }

    };
    
    public getCategoryById = (req: Request, res: Response) => {
    
        try {
            
        } catch (error) {

            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));

        }

    };

    public createCategory = (req: Request, res: Response) => {
    
        try {
            
        } catch (error) {

            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));

        }

    };

    public updateCategory = (req: Request, res: Response) => {
    
        try {
            
        } catch (error) {

            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));

        }

    };

    public deleteCategory = (req: Request, res: Response) => {
    
        try {
            
        } catch (error) {
            
            (error instanceof Error) ? res.status(400).send(error.message) : res.status(400).send(String(error));
           
        }

    };

}

export default new CategoryController();
