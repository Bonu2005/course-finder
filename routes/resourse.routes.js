import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/resourse.controller.js";
import upload from "../multer/ResourseMulter.js";
import verifyType from "../middlewares/verifyType.js";
import verifyToken from "../middlewares/verifyToken.js";

const resourseRouter = Router()


resourseRouter.get("/",verifyToken, findAll);

resourseRouter.get("/:id",verifyToken ,findOne);

resourseRouter.post("/",verifyToken, upload.single("photo"), create);

resourseRouter.patch("/:id",verifyToken, upload.single("photo"), update);

resourseRouter.delete("/:id",verifyToken, remove);
export default resourseRouter