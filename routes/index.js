import { Router } from "express";
import centerRouter from "./center.routes.js";
import commentRouter from "./comment.routes.js";
import filialRouter from "./filial.routes.js";
import likeRouter from "./like.routes.js";
import majorityRouter from "./majority.routes.js";
import regionRouter from "./region.routes.js";
import resourseRouter from "./resourse.routes.js";
import resourseCategoryRouter from "./resourseCategory.routes.js";
import signinCourseRouter from "./signinCourse.routes.js";
import subjectRouter from "./subject.routes.js";
import userRouter from "./user.routes.js";

const mainRouter =Router()
mainRouter.use("/center",centerRouter)
mainRouter.use("/comment",commentRouter)
mainRouter.use("/filial",filialRouter)
mainRouter.use("/like",likeRouter)
mainRouter.use("/majority",majorityRouter)
mainRouter.use("/region",regionRouter)
mainRouter.use("/resourse",resourseRouter)
mainRouter.use("/resourseCategory",resourseCategoryRouter)
mainRouter.use("/signinCourse",signinCourseRouter)
mainRouter.use("/subject",subjectRouter)
mainRouter.use("/user",userRouter)
export default mainRouter