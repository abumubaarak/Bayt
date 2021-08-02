import express, { Router } from "express";
import { createProperty } from "./propertyController";
import { protectedRoute } from "../../middleware/authorization";

const router: Router = express();

router.route("/").post(createProperty);

export { router };
