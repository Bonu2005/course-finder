import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/resourse.controller.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";

const resourseRouter = Router()

resourseRouter.get("/",findAll)
resourseRouter.get("/:id", verifyToken, verifyRole(["admin"]), findOne)
resourseRouter.post("/", verifyToken, verifyRole(["admin", "user"]), create)
resourseRouter.patch("/:id", verifyToken, verifyRole(["admin", "user"]), update)
resourseRouter.delete("/:id", verifyToken, verifyRole(["admin", "user"]), remove)
export default resourseRouter