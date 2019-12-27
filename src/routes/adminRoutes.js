import express from 'express';
import *  as userController from '../controllers/usercontroller';

const router = express.Router();

router.get('/allUsers',userController.allUsers);

module.exports = router;