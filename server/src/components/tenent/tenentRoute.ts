import express, { Router } from "express";
import { protectedRoute } from "../../middleware/authorization";
import {
  acceptTenentRequest,
  createTenent,
  declineTenentRequest,
  getTenent,
  searchSingleTenent,
} from "./tenentController";

export const router: Router = express();

router.route("").post(protectedRoute, createTenent);
router.route("/:id").get(protectedRoute, searchSingleTenent);
router.route("").get(protectedRoute, getTenent);
router.route("/:id").delete(protectedRoute, declineTenentRequest);
router.route("/:id").put(protectedRoute, acceptTenentRequest);
