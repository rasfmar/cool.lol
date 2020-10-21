import dotenv from "dotenv"; dotenv.config();
import { Router } from "express";
import * as urlController from "../controllers/urlController";

const urlRouter = Router();
if (process.env.NODE_ENV === "development") {
  urlRouter.get("/", urlController.indexGet);
}
urlRouter.post("/", urlController.indexPost);
urlRouter.get("/:slug", urlController.slugGet);
urlRouter.post("/:slug", urlController.slugPost);

export default urlRouter;
