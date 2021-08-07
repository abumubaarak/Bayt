import express, { Router } from "express";
import { createProperty, getSingleProperty, searchProperty } from "./propertyController";
import { protectedRoute } from "../../middleware/authorization";

const router: Router = express();

router.route("/").post(protectedRoute,createProperty);
router.route("/").get(searchProperty)
router.route("/:id").get(getSingleProperty)

export { router };
