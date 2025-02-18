import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/resourse.controller.js";

const resourseRouter = Router()

resourseRouter.get("/",findAll)
resourseRouter.get("/:id",findOne)
resourseRouter.post("/",create)
resourseRouter.patch("/:id",update)
resourseRouter.delete("/:id",remove)
export default resourseRouter