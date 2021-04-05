import * as dotenv from "dotenv";
import express, {
  json,
  Application,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import helmet from "helmet";
import "colors";

dotenv.config();

const app: Application = express();

const PORT: number = parseInt(process.env.PORT || ("7000" as string), 10);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.status(200).json({ sucess: true });
});

app.listen(PORT, () =>
  console.log(`Server running at ${PORT} `.bgGreen.white.bold)
);
