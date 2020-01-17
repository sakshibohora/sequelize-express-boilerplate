import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import publicRoutes from './src/routes/public';
import apiRoutes from './src/routes/apiRoutes';
import adminMiddleware from './src/middleware/adminMiddleware';
import apiMiddleware from './src/middleware/apiAuth';
import adminRoutes from './src/routes/adminRoutes';

if (process.env.NODE_ENVIRONMENT === 'prod') {
  dotenv.config();
} else if (process.env.NODE_ENVIRONMENT === 'stag') {
  dotenv.config({ path: '.env.stg' });
} else {
  dotenv.config({ path: '.env.local.test' });
}

require('./src/config/sequelize');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors({
//   'Access-Control-Allow-Origin': 'https://editor.swagger.io',
// }));
const whitelist = ['https://app.swaggerhub.com'];
const corsOptionsDelegate = function (req, callback) {
  console.log('ORIGIN:', req.header('Origin'));

  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use('/pub', publicRoutes);
app.use('/api', apiMiddleware, apiRoutes);
app.use('/api/admin', apiMiddleware, adminMiddleware, adminRoutes);
module.exports = app;
