import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/filial.controller.js";

const signinCourseRouter = Router()
signinCourseRouter.post("/",create)
signinCourseRouter.delete("/:id",remove)
export default signinCourseRouter