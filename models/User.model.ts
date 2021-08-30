import {
  Table,
  Model,
  Column,
  Unique,
  DefaultScope,
  Scopes,
  PrimaryKey,
} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
@Scopes(() => ({
  withPassword: {
    attributes: {
      include: ['password'],
    },
  },
}))
  @Table({
    timestamps: true
  })
export default class User extends Model {
  @Column
  name: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;



}
