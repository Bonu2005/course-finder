import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/subject.controller.js";
import upload from "../multer/SubjectMulter.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";

const subjectRouter = Router()

subjectRouter.get("/", findAll);

subjectRouter.get("/:id", findOne);

subjectRouter.post("/",verifyToken,verifyRole(['admin']), upload.single("photo"), create);

subjectRouter.patch("/:id",verifyToken,verifyRole(['ceo','admin']), upload.single("photo"), update);

subjectRouter.delete("/:id",verifyToken,verifyRole('admin'), remove);

export default subjectRouter
