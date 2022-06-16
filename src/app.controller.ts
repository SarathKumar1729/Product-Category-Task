import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { category } from './DTO/category.dto';
import { filter } from './DTO/filter.dto';
import { PaginationParams } from './DTO/paginatiom.dto';
import { product } from './DTO/product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/category')
  create(@Body(ValidationPipe)category:category){
  return this.appService.create(category);
  }
  @Get('/category')
  findAll(){
  return this.appService.findAll();
  }
   @Post('/product')
  createProduct(@Body(ValidationPipe)product:product){
  return this.appService.createProduct(product);
  }
  @Get('/product')
  findAllProduct(){
  return this.appService.findAllProduct();
  }
  @Get('/getAllProducts')
//   findAllBook(@Query() filterData: filter) {
//     console.log(filterData);
//     return this.appService.findAllProducts(filterData);
// }
async findAllBook(
  @Query('search') search: string,
  @Query() { offset, limit,pages,amount,sort}: PaginationParams
) {
  if (search) {
    
    console.log();
    
    
    return this.appService.findAllProducts(search, offset, limit);
  }
console.log(sort);

  return this.appService.getPages(pages,sort);
}

}
