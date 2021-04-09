import express, { Router } from "express";
import * as controller from "../controllers/auth";

const router: Router = express();

router.route("/register").post(controller.register);

export { router };
