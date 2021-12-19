import express, { Router } from "express";
import { protectedRoute } from "../../middleware/authorization";
import { getMessages } from "./messageController";

const router: Router = express();

router.route("").get(protectedRoute, getMessages);

export default router;
