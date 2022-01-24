import express, { Router } from "express";
import { protectedRoute } from "../../middleware/authorization";
import {
  addToWishlist,
  getUserWishlist,
  removeWishlist,
} from "./wishlistController";

export const router: Router = express();

router
  .route("")
  .get(protectedRoute, getUserWishlist)
  .put(protectedRoute, addToWishlist);
router.route("/:id").delete(protectedRoute, removeWishlist);
