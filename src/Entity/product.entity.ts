import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    productid:number;
    @Column()
    productname:string;
    @Column()
    qty:number;
    @Column()
    amount:number;
    @ManyToOne(() => Category,{eager:true})
  @JoinColumn([{name:'category',referencedColumnName:'categoryid'}])
  category: number;
}