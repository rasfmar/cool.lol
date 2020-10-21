import dotenv from "dotenv"; dotenv.config();
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import urlRouter from "./routes/urlRoute";
import { notFoundHandler, errorHandler } from "./controllers/errorHandler";
import { DEFAULT_MONGODB_URI, DEFAULT_PORT } from "./config/constants";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI || DEFAULT_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app: Express = express();
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(express.json());

app.use("/", urlRouter);
app.use(notFoundHandler);
app.use(errorHandler);

const port: string = process.env.PORT || DEFAULT_PORT;
app.listen(port, () => {
  console.log(`Server listening at https://localhost:${port}`);
});
