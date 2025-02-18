import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/center.controller.js";

const centerRouter = Router()

centerRouter.get("/",findAll)
centerRouter.get("/:id",findOne)
centerRouter.post("/",create)
centerRouter.patch("/:id",update)
centerRouter.delete("/:id",remove)
export default centerRouter