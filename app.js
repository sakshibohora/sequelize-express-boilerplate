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
app.use(cors({
  'Access-Control-Allow-Origin': 'https://editor.swagger.io',
}));
// const whitelist = ['https://editor.swagger.io'];
// const corsOptions = {
//   origin(origin, callback) {
//     console.log('TCL: origin -> origin', origin);
//     if (whitelist.indexOf(origin) !== -1 || origin !== undefined) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// app.use(cors(corsOptions));

app.use('/pub', publicRoutes);
app.use('/api', apiMiddleware, apiRoutes);
app.use('/api/admin', apiMiddleware, adminMiddleware, adminRoutes);
module.exports = app;
