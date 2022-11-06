
import { Length, IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateWordDto {

    @Length(3, 20)
    @IsNotEmpty()
    @IsString()
    name?: string;
    
    @IsNotEmpty()
    @IsNumber()
    categoryId?: number;

}
