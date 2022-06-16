import { IsNumber, IsOptional, IsString } from "class-validator";
import { UniqueMetadata } from "typeorm/metadata/UniqueMetadata";

export class filter{
    @IsString()
    @IsOptional()
    search?:string;
    @IsNumber()
    @IsOptional()
    page?:number;
    sort:any;

}