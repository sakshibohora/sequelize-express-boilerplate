import dotenv from 'dotenv';

const Sequelize = require('sequelize');
// require('dotenv').config();


if (process.env.NODE_ENVIRONMENT === 'prod') {
  dotenv.config();
} else if (process.env.NODE_ENVIRONMENT === 'stag') {
  dotenv.config({ path: `${__dirname.split('/src')[0]}/.env.stg` });
} else {
  dotenv.config({ path: `${__dirname.split('/src')[0]}/.env.local.test` });
}
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
);
// const sequelize = new Sequelize('postgres', process.env.DB_USER, process.env.DB_PASS, {
//   dialect: process.env.DB_DIALECT,
//   host: process.env.DB_HOST,
// });

// const database = process.env.DB_NAME;
// console.log('TCL: database', database);
// // logger.info(`Creating database "${database}"...`);
// sequelize.query(`CREATE DATABASE IF NOT EXISTS"${database}"`).then(() => console.log('Database created'));

sequelize
  .authenticate()
  .then((res) => {
    console.log(res);

    console.log('Connection has been established successfully');
  }).catch((err) => {
    console.log('Unable to connect to db', err);
  });
