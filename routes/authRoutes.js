import { Router } from 'express';

import {createLogin} from '../controllers/authController.js';
const router = new Router();

router.post("/users/login", createLogin);

export default router;