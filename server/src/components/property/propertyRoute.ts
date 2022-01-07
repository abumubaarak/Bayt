import express, { Router } from "express";
import { ownerProtectedRoute } from "../../middleware/authorization";
//import { cache } from "../../middleware/cache";
 import {
  createProperty,
  getOwnerProperty,
  getSingleProperty,
  searchProperty,
} from "./propertyController";

const router: Router = express();
router.route("/owner").get(ownerProtectedRoute, getOwnerProperty);
router.route("/").post(ownerProtectedRoute, createProperty);
router.route("/").get(searchProperty);
router.route("/:id").get(getSingleProperty);

export { router };
