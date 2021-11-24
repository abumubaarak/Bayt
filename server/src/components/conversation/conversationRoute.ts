import express, { NextFunction, Router } from "express";
import { asyncHandler } from "../../middleware/async";
import { ownerProtectedRoute, protectedRoute } from "../../middleware/authorization";
import { getUserConverse, sendMessage } from "./conversationController";
const router: Router = express();

router.route("/:id").get(getUserConverse);
router.route("/").post(protectedRoute, sendMessage);

export { router };
