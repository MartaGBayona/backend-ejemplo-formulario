// companies.routes.js
import { Router } from "express";
import { registerCompany } from "../controllers/companies.controller.js";

const router = Router();

router.post('/register', registerCompany);

export default router;
