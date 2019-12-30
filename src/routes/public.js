import express from 'express';
import validate from 'express-validation';

import { login, register } from '../controllers/usercontroller';
import { loginValidate, registerValidate } from '../controllers/uservalidator';

const router = express.Router();


router.post('/login',
  validate(loginValidate),
  login);

router.post(
  '/register',
  validate(registerValidate),
  register,
);

module.exports = router;
