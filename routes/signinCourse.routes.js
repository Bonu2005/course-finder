import { Router } from "express";
import { create, findAll, remove } from "../controllers/signinCourse.controller.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";

const signinCourseRouter = Router()
signinCourseRouter.get("/", verifyToken, verifyRole(["admin"]), findAll)
signinCourseRouter.post("/", verifyToken, verifyRole(["admin", "user"]), create)
signinCourseRouter.delete("/:id", verifyToken, verifyRole(["admin", "user"]),remove)
export default signinCourseRouter