import { Router } from "express";

import {
  createCompany,
  getAllCompanies,
  getOneCompany,
  deleteOneCompany,
  updateOneCompany,
} from "../controllers/companiesController.js";

const router = new Router();
router.post("/companies", createCompany);
router.get("/companies", getAllCompanies);
router.get("/companies/:id", getOneCompany);
router.delete("/companies/:id", deleteOneCompany);
router.put("/companies/:id", updateOneCompany);
export default router;
