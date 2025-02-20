import { Router } from "express";
import { create, findAll, findOne, remove, removeMajority, update } from "../controllers/center.controller.js";

const centerRouter = Router()

centerRouter.get("/",findAll)
centerRouter.get("/:id",findOne)
centerRouter.post("/",create)
centerRouter.patch("/:id",update)
centerRouter.delete("/:id",remove)
centerRouter.delete("/majority/:id",removeMajority)
export default centerRouter