import express from 'express';
import { allUsers } from '../controllers/usercontroller';

const router = express.Router();

router.get('/allUsers', allUsers);

module.exports = router;
