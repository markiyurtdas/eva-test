import {
    Table,
    Model,
    Column,
    PrimaryKey,
    Length,
    ForeignKey,
  } from 'sequelize-typescript';  
import User from './User.model';

  @Table({
    timestamps: true
  })
  export default class Share extends Model {
    
    @PrimaryKey
    @Length({max: 3, min: 3})
    @Column
    symbol: string;
  
   
    @ForeignKey(() => User)
    @Column
    creatorId: number;
  }
  