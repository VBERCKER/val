import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import env from "dotenv"
env.config();

export const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: 3306,
});

const db= async()=>{

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
db()


