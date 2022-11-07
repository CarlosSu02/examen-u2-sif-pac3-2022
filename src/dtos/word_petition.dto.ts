
import { Length, IsNotEmpty, IsString, IsNumber } from "class-validator";

export class WordPetitionDto {

    @Length(1, 20)
    @IsNotEmpty()
    @IsString()
    word?: string;

}
