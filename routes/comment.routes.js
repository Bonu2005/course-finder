import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/comment.controller.js";

const commentRouter = Router()

commentRouter.get("/",findAll)
commentRouter.get("/:id",findOne)
commentRouter.post("/",create)
commentRouter.patch("/:id",update)
commentRouter.delete("/:id",remove)
export default commentRouter