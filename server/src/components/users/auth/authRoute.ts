import express, { Router } from "express";
import passport from "passport";
import { protectedRoute } from "../../../middleware/authorization";
import * as auth from "./authController";
const router: Router = express();

const path = "/api/v1/auth";

router.route(`${path}/register`).post(auth.register);
router.route(`${path}/login`).post(auth.login);
router.route(`${path}/getme`).get(auth.getMe);
router.route(`${path}/getme/:id`).get(auth.getLandlord);
router.route(`${path}/logout`).get(auth.logout);
router.route(`${path}/update`).post(auth.updateProfile);
router.route(`${path}/user`).get(protectedRoute,auth.getUser);

router
  .route(`${path}/google`)
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));
router
  .route(`${path}/github`)
  .get(passport.authenticate("github", { scope: ["profile"] }));

router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/failed",
    successRedirect: "http://localhost:3000",
    session: true,
  })
);

router.route("/auth/github/callback").get(
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/failed",
    successRedirect: "http://localhost:3000",
    session: true,
  })
);

export { router };
