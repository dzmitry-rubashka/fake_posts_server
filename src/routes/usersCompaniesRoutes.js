import { Router } from 'express';

import {createUsersCompanies} from '../controllers/usersCompsniesController.js';
const router = new Router();

router.post("/userscompanies", createUsersCompanies);

export default router;