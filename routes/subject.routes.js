import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/subject.controller.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";

const subjectRouter = Router()

subjectRouter.get("/",findAll)
subjectRouter.get("/:id", verifyToken, verifyRole(["admin"]), findOne)
subjectRouter.post("/", verifyToken, verifyRole(["admin"]), create)
subjectRouter.patch("/:id", verifyToken, verifyRole(["admin"]), update)
subjectRouter.delete("/:id", verifyToken, verifyRole(["admin"]), remove)

export default subjectRouter
