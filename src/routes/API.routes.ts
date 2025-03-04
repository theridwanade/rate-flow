import { Router } from "express";
import { historicalRates, latestRates, pairRatesConversion } from "../controller/API.controller";

const router = Router();

router.get("/latest.json", latestRates);
router.get("/historical/:date.json", historicalRates);
router.get("/pair", pairRatesConversion)

const APIRoutes = router;
export default APIRoutes;