import express, { Router } from "express";
import { protectedRoute } from "../../middleware/authorization";
import {
  checkout,
  getSinglePayment,
  getUserPayments,
  successfulPayment,
} from "./paymentController";

const router: Router = express();

router.route("").post(protectedRoute, checkout);
router.route("/webhook").post(successfulPayment);
router.route("").get(protectedRoute, getUserPayments);
router.route("/:id").get(protectedRoute, getSinglePayment);
export { router };
