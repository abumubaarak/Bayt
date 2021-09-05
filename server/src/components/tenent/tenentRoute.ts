import express from "express";
import { Router } from "express";
import { sessionProtectedRoute } from "../../middleware/authorization";
import { checkTenent, createTenent } from "./tenentController";

export const router: Router = express();

router.route("").post(createTenent);
router.route("").get(sessionProtectedRoute,checkTenent)
