import Router from "express";

import CompanyPersonController from "../controllers/companyPersonController.js";

const router = new Router();

router.post("/company_person", CompanyPersonController.createCompanyPersonRelation);

export default router;