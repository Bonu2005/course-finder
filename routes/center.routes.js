import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/center.controller.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyType from "../middlewares/verifyType.js"

const centerRouter = Router()

centerRouter.get("/",findAll)
centerRouter.get("/:id", verifyToken, verifyRole(["admin"]),findOne);
centerRouter.post("/",verifyToken, verifyRole(["admin"]), verifyType(["ceo"]),create);
centerRouter.patch("/:id", verifyToken, verifyRole(["admin"]), update)
centerRouter.delete("/:id", verifyToken, verifyRole(["admin"]), remove)
export default centerRouter