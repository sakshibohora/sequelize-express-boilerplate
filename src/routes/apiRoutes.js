import express from 'express';
import validate from 'express-validation';

import { profile, changePassword } from '../controllers/usercontroller';
import { changePasswordValidate } from '../controllers/uservalidator';

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get('/me', profile);
router.post(
  '/changePassword',
  validate(changePasswordValidate),
  changePassword,
);

module.exports = router;
