import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import "colors";
import { router as userRouter } from "./components/users/auth/authRoute";
import { router as PropertiesRoute } from "./components/property/propertyRoute";
import cookies from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware";
import upload from "./middleware/upload";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookies());
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/properties", upload, PropertiesRoute);
app.use(errorMiddleware);

export default app;
