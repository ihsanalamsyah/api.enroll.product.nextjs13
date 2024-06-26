import { Sequelize } from "sequelize";
import env from "dotenv";
import mysql2 from 'mysql2';

env.config();

const db = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectModule: mysql2
});

export default db;