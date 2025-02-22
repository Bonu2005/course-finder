import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/majority.controller.js";
import upload from "../multer/MajorityMulter.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";

const majorityRouter = Router()


majorityRouter.get("/", findAll);

majorityRouter.get("/:id", findOne);

majorityRouter.post("/",verifyToken,verifyRole('admin'), upload.single("photo"), create);

majorityRouter.patch("/:id",verifyToken,verifyRole('admin'), upload.single("photo"), update);

majorityRouter.delete("/:id",verifyToken,verifyRole('admin'), remove);

export default majorityRouter