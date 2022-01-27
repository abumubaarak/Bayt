import express, { Router } from "express";
import { protectedRoute } from "../../middleware/authorization";
import {
  createProperty,
  getOwnerProperty,
  getSingleProperty,
  searchProperty,
} from "./propertyController";


const router: Router = express();
router.route("/owner").get(protectedRoute, getOwnerProperty);
router.route("/").post(protectedRoute, createProperty);
router.route("/").get( searchProperty);
router.route("/:id").get(getSingleProperty);

export { router };
