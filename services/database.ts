import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'evadb',
  dialect: 'postgres',
  username: 'postgres',
  password: 'postgres',
  models: [process.cwd() + '/build/models/**/*.model.js'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});

export default sequelize;
