import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/resourseCategory.controller.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";

const resourseCategoryRouter = Router()

resourseCategoryRouter.get("/",findAll)
resourseCategoryRouter.get("/:id", verifyToken, verifyRole(["admin"]),findOne)
resourseCategoryRouter.post("/", verifyToken, verifyRole(["admin"]), create)
resourseCategoryRouter.patch("/:id", verifyToken, verifyRole(["admin"]),update)
resourseCategoryRouter.delete("/:id", verifyToken, verifyRole(["admin"]),remove)
export default resourseCategoryRouter