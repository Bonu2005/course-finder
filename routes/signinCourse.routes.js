import { Router } from "express";
import { create, findAll, finish} from "../controllers/signinCourse.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyType from "../middlewares/verifyType.js";

const signinCourseRouter = Router()

signinCourseRouter.get("/",verifyToken,verifyType(['ceo','admin']), findAll);

signinCourseRouter.post("/",verifyToken, create);

signinCourseRouter.patch("/:id",verifyToken,verifyRole(['admin']), finish);
export default signinCourseRouter