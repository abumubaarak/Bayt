import express, { Router } from "express";
import {
  protectedRoute,
  sessionProtectedRoute,
} from "../../middleware/authorization";
import {
  addToWishlist,
  getUserWishlist,
  removeWishlist,
} from "./wishlistController";

export const router: Router = express();

router
  .route("")
  .get(protectedRoute, getUserWishlist)
  .put(sessionProtectedRoute, addToWishlist);
router.route("/:id").delete(sessionProtectedRoute, removeWishlist);
