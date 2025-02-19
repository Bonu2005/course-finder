import {send_otp, verify_otp, register, login, findAll, findOne, create, update, remove, send_update_otp} from "../controllers/user.controller.js";
import upload from "../multer/multer.js";
import {Router} from 'express';
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifySelf from "../middlewares/verifySelf.js";
let userRouter = Router();

userRouter.get("/send-otp", send_otp);
userRouter.get("/verify-otp", verify_otp);
userRouter.post("/register", upload.single("image"), register);
userRouter.post("/login", login);
userRouter.get("/users", verifyToken, findAll);
userRouter.get("/user/:id", verifyToken,verifyRole(["user"]), findOne);
userRouter.post("/user",verifyToken,verifyRole(["user"]), upload.single("image"), create);
userRouter.get("/send-update-otp/:id",verifyToken,verifySelf(["user"]), send_update_otp);
userRouter.patch("/user/:otp2", verifyToken,verifyRole(["user"]), upload.single("image"), update);
userRouter.delete("/user/:id", verifyToken,verifyRole(["admin"]), remove);

export default userRouter;