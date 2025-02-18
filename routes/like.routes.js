import { Router } from "express";
import { create } from "../controllers/like.controller.js";

const likeRouter = Router()


likeRouter.post("/",create)

export default likeRouter