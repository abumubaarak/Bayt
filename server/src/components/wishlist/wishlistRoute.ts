import express from "express";
import { Router } from "express";
import { sessionProtectedRoute } from "../../middleware/authorization";
import { addToWishlist, removeWishlist } from "./wishlistController";

export const router: Router = express();

router.route("").put(sessionProtectedRoute, addToWishlist);
router.route("/:id").delete(sessionProtectedRoute, removeWishlist);
