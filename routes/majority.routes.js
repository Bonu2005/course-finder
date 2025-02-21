import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/majority.controller.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyType from "../middlewares/verifyType.js"

const majorityRouter = Router()

majorityRouter.get("/",findAll)
majorityRouter.get("/:id", verifyToken, verifyRole(["admin"]), verifyType(["ceo"]), findOne)
majorityRouter.post("/", verifyToken, verifyRole(["admin"]), create)
majorityRouter.patch("/:id", verifyToken, verifyRole(["admin"]), update)
majorityRouter.delete("/:id",verifyToken, verifyRole(["admin"]), remove)
export default majorityRouter