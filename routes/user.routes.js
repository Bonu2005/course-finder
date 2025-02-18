import { Router } from "express";
import { create, findAll} from "../controllers/user.controller.js";

const userRouter = Router()
userRouter.get("/",findAll)
userRouter.post("/",create)
export default userRouter