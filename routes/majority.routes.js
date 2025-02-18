import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/majority.controller.js";

const majorityRouter = Router()

majorityRouter.get("/",findAll)
majorityRouter.get("/:id",findOne)
majorityRouter.post("/",create)
majorityRouter.patch("/:id",update)
majorityRouter.delete("/:id",remove)
export default majorityRouter