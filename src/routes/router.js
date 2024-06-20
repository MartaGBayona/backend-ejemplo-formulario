import { Router } from "express";
import companiesRoutes from "./companies.routes.js";

const router = Router();

router.use('/companies', companiesRoutes)

export default router;