import { Router } from "express";
import { currencyCode, updateRates } from "../controller/jobs.controller";

const router = Router();

router.get("/currency-codes", currencyCode);
router.get("/update-rates", updateRates);

const JobsRoutes = router;
export default JobsRoutes;