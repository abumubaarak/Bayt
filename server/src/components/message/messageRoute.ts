import express, { Router } from "express";
import { ownerProtectedRoute, sessionProtectedRoute } from "../../middleware/authorization";
import { getUserMessage ,getOwnerMessage} from "./messageController";

const router: Router = express();

router.route("/:id").get(sessionProtectedRoute, getUserMessage);
router.route("").get(ownerProtectedRoute, getOwnerMessage);

export default router;
