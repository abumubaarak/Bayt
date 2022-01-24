import express, { Router } from "express";
import passport from "passport";
import { protectedRoute } from "../../../middleware/authorization";
import { signJwtToken } from "../../../utils/token";
import * as auth from "./authController";
const router: Router = express();

const path = "/api/v1/auth";

router.route(`${path}/register`).post(auth.register);
router.route(`${path}/login`).post(auth.login);
router.route(`${path}/getme/:id`).get(auth.getLandlord);

router.route(`${path}/logout`).get(auth.logout);
router.route(`${path}/update`).post(protectedRoute, auth.updateProfile);
router.route(`${path}/user`).get(protectedRoute, auth.getUser);

router
  .route(`/api/v1/oauth/google`)
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));
router
  .route(`/api/v1/oauth/github`)
  .get(passport.authenticate("github", { scope: ["profile"], session: false }));

//baytfrontend.s3-website.us-east-2.amazonaws.com/
const clientUrl =
  process.env.NODE_ENV === "development"
    ? process.env.CLIENT_DEV_URL!
    : process.env.CLIENT_URL!;
router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: `${clientUrl}/falied`,
    session: false,
  }),
  successRedirect
);

router.route("/auth/github/callback").get(
  passport.authenticate("github", {
    failureRedirect: `${clientUrl}/falied`,
    session: false,
  }),
  successRedirect
);

function successRedirect(req: any, res: any) {
  const user = req.user;
  res.cookie("access_token", signJwtToken(user));

  res.redirect(`${clientUrl}`);
}

export { router };
