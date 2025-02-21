import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/region.controller.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";


const regionRouter = Router()
regionRouter.get("/",findAll)
regionRouter.get("/:id", verifyToken, verifyRole(["admin"]), findOne)
regionRouter.post("/", verifyToken, verifyRole(["admin"]), create)
regionRouter.patch("/:id", verifyToken, verifyRole(["admin"]), update)
regionRouter.delete("/:id", verifyToken, verifyRole(["admin"]), remove)
export default regionRouter