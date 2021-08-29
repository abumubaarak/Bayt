import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import "colors";
import { router as userRouter } from "./components/users/auth/authRoute";
import { router as PropertiesRoute } from "./components/property/propertyRoute";
import cookies from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware";
import upload from "./middleware/upload";
import passport from "passport";
import session from "express-session";
import * as dotenv from "dotenv";

import { gitHubStrategy, googleStrategy } from "./config/passport";
const MongoStore = require("connect-mongo");
const app: Application = express();

dotenv.config();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookies());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_URL,
    }),
    // cookie: {
    //   maxAge:1000*60*60*24
    // }
  })
);

app.use(passport.initialize());
app.use(passport.session());

googleStrategy(passport);
gitHubStrategy(passport)

app.use("", userRouter);
app.use("/api/v1/properties", upload, PropertiesRoute);
app.use(errorMiddleware);
app.use("/uploads", express.static("uploads"));

export default app;
