import { Router } from "express";
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyType from "../middlewares/verifyType.js"
import { create, findAll, findOne, remove, removeMajority, update } from "../controllers/center.controller.js";
import upload from "../multer/CentersMulter.js";

const centerRouter = Router()
centerRouter.get("/", findAll);
centerRouter.get("/:id",  verifyToken, verifyRole(["admin"]), findOne);
centerRouter.post("/",  verifyToken, verifyRole(["admin"]), verifyType(["ceo"]), upload.single("photo"), create);
centerRouter.patch("/:id", verifyToken, verifyRole(["admin"]), verifyType(["ceo"]),  upload.single("photo"), update)
centerRouter.delete("/majority/:id", verifyToken, verifyRole(["admin"]), verifyType(["ceo"]), removeMajority);
export default centerRouter