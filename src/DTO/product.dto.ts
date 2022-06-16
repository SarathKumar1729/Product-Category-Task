import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class product{
    @IsString()
    @IsNotEmpty()
    productname:string;
    @IsNumber()
    @IsNotEmpty()
    qty:number;
    @IsNumber()
    @IsNotEmpty()
    @IsNumber()
    amount:number;
    @IsNumber()
    @IsNotEmpty()
    category:number;
    
}