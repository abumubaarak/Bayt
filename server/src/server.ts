import * as dotenv from "dotenv";
import "colors";
import app from "./app";
import { connectDb } from "../src/config/db";

dotenv.config();

const PORT: number = parseInt(process.env.PORT || ("7000" as string), 10);

const server = app.listen(PORT, () =>
  console.log(`Server running at ${PORT} `.bgGreen.white.bold)
);
connectDb();
process.on("unhandledRejection", (reason: Error, promise: any) => {
  server.close(() => process.exit(1));
});
