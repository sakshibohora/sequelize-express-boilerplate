const dotenv = require('dotenv');


const Sequelize = require('sequelize');

console.log('NODE_ENVIRONMENT >>>>>>', process.env.NODE_ENVIRONMENT);
if (process.env.NODE_ENVIRONMENT === 'prod') {
  dotenv.config();
} else if (process.env.NODE_ENVIRONMENT === 'stag') {
  dotenv.config({ path: `${__dirname.split('/src')[0]}/.env.stg` });
} else {
  dotenv.config({ path: `${__dirname.split('/src')[0]}/.env.local.test` });
}
// const dbCreate = () => {
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres',
//   },
// );
const sequelize = new Sequelize(process.env.DB_DIALECT, process.env.DB_USER, process.env.DB_PASS, {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
});

const database = process.env.DB_NAME;
sequelize.query(`CREATE DATABASE "${database}"`).then(() => console.log('Database created'));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  }).catch((err) => {
    console.log('Unable to connect to db', err);
  });
