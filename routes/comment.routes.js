import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/comment.controller.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";

const commentRouter = Router()

commentRouter.get("/",findAll)
commentRouter.get("/:id",verifyToken, verifyRole(["admin"]), findOne)
commentRouter.post("/",verifyToken, verifyRole(["admin", "user"]), create)
commentRouter.patch("/:id", verifyToken, verifyRole(["admin", "user"]), update)
commentRouter.delete("/:id", verifyToken, verifyRole(["admin", "user"]), remove)
export default commentRouter