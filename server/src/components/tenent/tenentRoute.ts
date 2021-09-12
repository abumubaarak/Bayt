import express from "express";
import { Router } from "express";
import {
  ownerProtectedRoute,
  sessionProtectedRoute,
} from "../../middleware/authorization";
import {
  searchSingleTenent,
  createTenent,
  getTenent,
  declineTenent,
} from "./tenentController";

export const router: Router = express();

router.route("").post(createTenent);
router.route("/:id").get(sessionProtectedRoute, searchSingleTenent);
router.route("").get(ownerProtectedRoute, getTenent);
router.route("/:id").delete(ownerProtectedRoute, declineTenent);
