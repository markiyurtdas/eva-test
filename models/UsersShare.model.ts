import {
    Table,
    Model,
    Column,
    PrimaryKey,
    Length,
    ForeignKey
  } from 'sequelize-typescript';  
import Share from './Share.model';
import User from './User.model';

  @Table({
    timestamps: true
  })
  export default class UsersShare extends Model {
    
    @PrimaryKey
    @Length({max: 3, min: 3})
    @ForeignKey(() => Share)
    @Column
    symbol: string;
  
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    userId: number;

    @Column
    quantity: number;

    @Column
    price: number;

    
  
  }
  