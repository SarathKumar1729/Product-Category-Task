import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { category } from './DTO/category.dto';
import { filter } from './DTO/filter.dto';
import { PaginationParams } from './DTO/paginatiom.dto';
import { product } from './DTO/product.dto';
import { Category } from './Entity/category.entity';
import { Product } from './Entity/product.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ){}
  getHello(): string {
    return 'Hello World!';
  }
  async create(categorydto:category) {
    const exists =(await this.categoryRepository.count({ where: { categoryname: categorydto.categoryname }, })) != 0 ? true : false;

    if (exists) {
      throw new HttpException('Book Name already exists', 403);
    }
    this.categoryRepository.save(categorydto);
    return {
      message: 'Successfully created',
    };
    
  }  
  async findAll(){
    return await this.categoryRepository.find()
  }
  async findAllProduct(){
    return await this.productRepository.find()
  }
  async createProduct(productdto:product) {
    const exists =(await this.productRepository.count({ where: { productname: productdto.productname }, })) != 0 ? true : false;
    this.productRepository.save(productdto);
    return {
      message: 'Successfully created',
    };
  } 
  async findAllProducts(search:string,offset:PaginationParams['offset'], limit:PaginationParams['limit']) {
    if(search){
    const repo = this.productRepository.createQueryBuilder('product');
  

    
    let query = repo
      .leftJoinAndSelect('product.category', 'category')
      .select([
        'product.productname',
        'product.qty',
        'product.amount',
        'category.categoryname',
      ])
      
      .andWhere('product.productname ilike :searchText', { searchText: `%${search}%`})
     
        .orderBy('product.qty'||'product.amount');
      
     
      
      
    const filteredproducts = await query.getMany();
    
    
    if (filteredproducts.length === 0) {
      throw new HttpException('0 product found', HttpStatus.NOT_FOUND);
    }
    return filteredproducts;
  }
  else{
    return await this.productRepository.find();
  }
  } 
  
  async getPages(pages?:number,sort?:string) {
    if(pages){
    const [items, count] = await this.productRepository.findAndCount({
      relations: ['category'],
      order: {
        productid: 'ASC'
      },
      skip: ((pages-1)*5),
      take: 5
    });
  
    const total_pages=Math.round(count/5);
    if(pages>total_pages) {
      throw new HttpException('Page Out Of Range',403);
      }
    return {
      items,
      count,
      total_pages
    }
  }
  else{
    console.log(sort);
    
    const reposit = this.productRepository.createQueryBuilder('product');
    let query1 = reposit
      .leftJoinAndSelect('product.category', 'category')
      .select([
        'product.productname',
        'product.qty',
        'product.amount',
        'category.categoryname',
      ])
       .orderBy(sort);
       const sortproducts = await query1.getMany();
       if (sortproducts.length === 0) {
        throw new HttpException('0 Product found', HttpStatus.NOT_FOUND);
      }
      return sortproducts;
    }

  }
 
}

