import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/resourseCategory.controller.js";
import upload from "../multer/ResourseMulter.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";

const resourseCategoryRouter = Router()


resourseCategoryRouter.get("/", verifyToken,findAll);


resourseCategoryRouter.get("/:id",verifyToken, findOne);


resourseCategoryRouter.post("/",verifyToken,verifyRole(['admin']), upload.single("photo"), create);

resourseCategoryRouter.patch("/:id",verifyToken,verifyRole(['admin']), upload.single("photo"), update);


resourseCategoryRouter.delete("/:id",verifyToken,verifyRole(['admin']), remove);


export default resourseCategoryRouter