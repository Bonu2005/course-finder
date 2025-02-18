import { Router } from "express";
import { create, findAll, remove } from "../controllers/signinCourse.controller.js";

const signinCourseRouter = Router()
signinCourseRouter.get("/",findAll)
signinCourseRouter.post("/",create)
signinCourseRouter.delete("/:id",remove)
export default signinCourseRouter