import "colors";
import * as dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDb } from "../src/config/db";
import { app } from "./app";
import { instant } from "./components/conversation/instant";

dotenv.config();

const PORT: number = parseInt(process.env.PORT || ("7000" as string), 10);

connectDb();

instant(app);

const server = app.listen(PORT, () =>
  console.log(`Server running at ${PORT} `.bgGreen.white.bold)
);
process.on("unhandledRejection", (reason: Error, promise: any) => {
  server.close(() => process.exit(1));
});
