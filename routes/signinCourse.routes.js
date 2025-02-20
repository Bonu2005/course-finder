import { Router } from "express";
import { create, findAll, finish} from "../controllers/signinCourse.controller.js";

const signinCourseRouter = Router()
signinCourseRouter.get("/",findAll)
signinCourseRouter.post("/",create)
signinCourseRouter.patch("/",finish)

export default signinCourseRouter