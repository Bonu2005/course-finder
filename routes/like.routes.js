import { Router } from "express";
import { create, remove } from "../controllers/like.controller.js";

const likeRouter = Router()


likeRouter.post("/",create)
likeRouter.delete("/:id",remove)
export default likeRouter