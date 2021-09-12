import express, { Router } from "express";
import { createProperty, getSingleProperty, searchProperty } from "./propertyController";
import { ownerProtectedRoute } from "../../middleware/authorization";

const router: Router = express();

router.route("/").post(ownerProtectedRoute,createProperty);
router.route("/").get(searchProperty)
router.route("/:id").get(getSingleProperty)

export { router };
