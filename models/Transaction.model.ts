import {
    Table,
    Model,
    Column,
    Unique,
    PrimaryKey,
    ForeignKey,
  } from 'sequelize-typescript';
import Share from './Share.model';
import User from './User.model';

  @Table({
    timestamps: true
  })
  export default class Transaction extends Model {
    
    @Column
    @ForeignKey(() => User)
    seller:number;

    @Column
    @ForeignKey(() => User)
    buyer:number;
  
    @ForeignKey(() => Share)
    @Column
    shareId: string;
  
    @Column
    quantity: number;

    @Column
    price:number;

  
  }
  