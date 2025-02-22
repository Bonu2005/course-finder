import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/comment.controller.js";

import verifyToken from "../middlewares/verifyToken.js";

const commentRouter = Router()

commentRouter.get("/",findAll);

commentRouter.get("/:id",findOne);

commentRouter.post("/",verifyToken, create);

commentRouter.patch("/:id",verifyToken,  update);

commentRouter.delete("/:id",verifyToken,  remove);
export default commentRouter