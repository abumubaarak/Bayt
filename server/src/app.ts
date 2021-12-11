import "colors";
import cookies from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";
import { router as ConversationRoute } from "./components/conversation/conversationRoute";
import { instant } from "./components/conversation/instant";
import InsightRouter from "./components/insight/insightRoute";
import MessageRoute from "./components/message/messageRoute";
import { router as PaymentRoute } from "./components/payment/paymentRoute";
import { router as PropertiesRoute } from "./components/property/propertyRoute";
import { router as tenentRoute } from "./components/tenent/tenentRoute";
import { router as userRouter } from "./components/users/auth/authRoute";
import { router as WishlistRoute } from "./components/wishlist/wishlistRoute";
import { gitHubStrategy, googleStrategy } from "./config/passport";
import { errorMiddleware } from "./middleware/error.middleware";
import upload from "./middleware/upload";

const MongoStore = require("connect-mongo");
const app: Application = express();

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
gitHubStrategy(passport);

app.use("", userRouter);
instant(app);

app.use("/api/v1/properties", upload, PropertiesRoute);
app.use("/api/v1/tenents", tenentRoute);
app.use("/api/v1/wishlists", WishlistRoute);
app.use("/api/v1/conversations", ConversationRoute);
app.use("/api/v1/messages", MessageRoute);
app.use("/api/v1/payments", PaymentRoute);
app.use("/api/v1/insights", InsightRouter);

app.use(errorMiddleware);
app.use("/uploads", express.static("uploads"));

export { app };
