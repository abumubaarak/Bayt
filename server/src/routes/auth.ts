import express, { Router } from "express";
import * as auth from "../controllers/auth";

const router: Router = express();

router.route("/register").post(auth.register);
router.route("/login").post(auth.login)

export { router };
