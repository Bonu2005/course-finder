import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/filial.controller.js";
import upload from "../multer/CentersMulter.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";

const filialRouter = Router()

filialRouter.get("/",verifyToken,findAll);


filialRouter.get("/:id",verifyToken, findOne);


filialRouter.post("/",verifyToken,verifyRole(['ceo']) ,upload.single("photo"), create);


filialRouter.patch("/:id",verifyToken,verifyRole(['ceo']) , upload.single("photo"), update);

filialRouter.delete("/:id",verifyToken,verifyRole(['ceo'])  , remove)
export default filialRouter