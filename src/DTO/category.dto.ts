import { IsNotEmpty, IsString } from "class-validator";

export class category{
    @IsString()
    @IsNotEmpty()
    categoryname:string;
}