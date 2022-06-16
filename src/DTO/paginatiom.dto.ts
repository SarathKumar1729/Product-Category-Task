import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

 
export class PaginationParams {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    offset?: number;
   
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number;

    
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    @IsNumber()
    pages?:number;

    @IsOptional()
   
    sort?:string

    @IsOptional()
    @Min(0)
    @Type(() => Number)
    @IsNumber()
    amount?:Number
  }