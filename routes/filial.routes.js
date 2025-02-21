import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/filial.controller.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyType from "../middlewares/verifyType.js"

const filialRouter = Router()

filialRouter.get("/",findAll)
filialRouter.get("/:id", verifyToken, verifyRole(["admin"]),findOne)
filialRouter.post("/", verifyToken, verifyRole(["admin"]), verifyType(["ceo"]),create);
filialRouter.patch("/:id", verifyToken, verifyRole(["admin"]), verifyType(["ceo"]), update)
filialRouter.delete("/:id", verifyToken, verifyRole(["admin"]), verifyType(["ceo"]), remove)
export default filialRouter