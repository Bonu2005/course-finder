import {send_otp, verify_otp, register, login, findAll, findOne, createAdmin, update, remove, send_update_otp, logout} from "../controllers/user.controller.js";
import upload from "../multer/UsersMulter.js";
import {Router} from 'express';
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifySelf from "../middlewares/verifySelf.js";
import refreshTokens from "../middlewares/refreshToken.js";
let userRouter = Router();

userRouter.post("/send-otp", send_otp);
userRouter.post("/verify-otp", verify_otp);
userRouter.post("/register", upload.single("image"), register);
userRouter.post("/login", login);
userRouter.get("/", verifyToken, findAll);
userRouter.get("/:id", verifyToken,verifyRole(["USER"]), findOne);
userRouter.post("/", verifyToken, verifyRole(["USER"]), upload.single("image"), createAdmin);
userRouter.post("/send-update-otp/:id", verifyToken, verifySelf(["USER"]), send_update_otp)
userRouter.patch("/:otp2/:oldemail", verifyToken, verifyRole(["USER"]), upload.single("image"), update);
userRouter.delete("/:id", verifyToken, verifyRole(["USER"]), remove);
userRouter.post("/:id", verifyToken, refreshTokens);
userRouter.post("/logout", verifyToken, logout);
userRouter.post("/:id", verifyToken, refreshTokens);


export default userRouter;
