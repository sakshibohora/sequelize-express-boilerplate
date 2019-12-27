import express from 'express';
import validate from 'express-validation'

import * as userController from '../controllers/usercontroller';
import * as userValidator from '../controllers/uservalidator';

const router = express.Router();


router.post('/login',
    validate(userValidator.login),
    userController.login,
);

router.post(
    '/register',
    validate(userValidator.register),
    userController.register,
);

module.exports = router;