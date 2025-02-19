import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/region.controller.js";

const regionRouter = Router()
regionRouter.get("/",findAll)
regionRouter.get("/:id",findOne)
regionRouter.post("/",create)
regionRouter.patch("/:id",update)
regionRouter.delete("/:id",remove)
export default regionRouter