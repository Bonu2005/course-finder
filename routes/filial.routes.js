import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/filial.controller.js";

const filialRouter = Router()

filialRouter.get("/",findAll)
filialRouter.get("/:id",findOne)
filialRouter.post("/",create)
filialRouter.patch("/:id",update)
filialRouter.delete("/:id",remove)
export default filialRouter