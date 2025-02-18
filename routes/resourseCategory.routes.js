import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/resourseCategory.controller.js";

const resourseCategoryRouter = Router()

resourseCategoryRouter.get("/",findAll)
resourseCategoryRouter.get("/:id",findOne)
resourseCategoryRouter.post("/",create)
resourseCategoryRouter.patch("/:id",update)
resourseCategoryRouter.delete("/:id",remove)
export default resourseCategoryRouter