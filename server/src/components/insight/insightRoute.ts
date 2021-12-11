import express, { Router } from "express";
import { protectedRoute } from "../../middleware/authorization";
import { getInsight } from "./insightController";

const router: Router = express();

router.route("").get(protectedRoute, getInsight);

export default router;
