import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import "colors";
import { connectDb } from "../src/config/db";
import { router as Authrouter } from "./routes/auth";
import { router as PropertiesRoute } from "./routes/properties";
import cookies from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware";
 import upload from "./middleware/upload";

dotenv.config();

const app: Application = express();

const PORT: number = parseInt(process.env.PORT || ("7000" as string), 10);

connectDb();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookies());
app.use("/api/v1/auth", Authrouter);
app.use("/api/v1/properties", upload, PropertiesRoute);

app.use(errorMiddleware);

const server = app.listen(PORT, () =>
  console.log(`Server running at ${PORT} `.bgGreen.white.bold)
);
process.on("unhandledRejection", (reason: Error, promise: any) => {
  server.close(() => process.exit(1));
});
