import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import publicRoutes from './src/routes/public';
import apiRoutes from './src/routes/apiRoutes';
import adminMiddleware from './src/middleware/adminMiddleware';
import apiMiddleware from './src/middleware/apiAuth';
import adminRoutes from './src/routes/adminRoutes';
dotenv.config()

require('./src/config/sequelize');
const app = express();
app.use(bodyParser.urlencoded({ extended: true, }))
app.use(bodyParser.json())

app.use('/pub',publicRoutes);
app.use('/api',apiMiddleware,apiRoutes);
app.use('/api/admin',apiMiddleware,adminMiddleware,adminRoutes);
module.exports = app;