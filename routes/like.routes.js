import { Router } from "express";
import { create, remove } from "../controllers/like.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const likeRouter = Router()

likeRouter.post("/",verifyToken, create);

likeRouter.delete("/:id",verifyToken, remove);  
export default likeRouter