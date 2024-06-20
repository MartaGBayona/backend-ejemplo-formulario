import { Router } from "express";
import { createCompany } from "../controllers/companies.controller.js";

const router = Router();

router.post('/register', createCompany)

export default router;