import { Router } from "express";
import { create, findAll, finish} from "../controllers/signinCourse.controller.js";

const signinCourseRouter = Router()
/**
 * @swagger
 * /signinCourse:
 *   get:
 *     summary: Barcha signinCourse ro'yxatini olish
 *     description: Foydalanuvchi, majority va filialga tegishli barcha signinCourse ro'yxatini olish.
 *     tags:
 *       - SigninCourse
 *     responses:
 *       200:
 *         description: Barcha signinCourse muvaffaqiyatli ko'rsatiladi
 *       500:
 *         description: Server xatosi
 */
signinCourseRouter.get("/", findAll);

/**
 * @swagger
 * /signinCourse:
 *   post:
 *     summary: Yangi signinCourse yaratish
 *     description: Yangi signinCourse yaratish uchun kerakli ma'lumotlarni yuborish.
 *     tags:
 *       - SigninCourse
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: Foydalanuvchi ID
 *               majorityId:
 *                 type: integer
 *                 description: Majority ID
 *               filialId:
 *                 type: integer
 *                 description: Filial ID
 *               status:
 *                 type: string
 *                 description: Status (masalan, "active" yoki "completed")
 *     responses:
 *       201:
 *         description: Yangi signinCourse muvaffaqiyatli yaratildi
 *       400:
 *         description: Yomon so'rov
 *       500:
 *         description: Server xatosi
 */
signinCourseRouter.post("/", create);

/**
 * @swagger
 * /signinCourse/{id}:
 *   patch:
 *     summary: SigninCourse statusini yangilash
 *     description: SigninCourse statusini yangilash, masalan, kursni tugatish.
 *     tags:
 *       - SigninCourse
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Kursning IDsi
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Statusni yangilash (masalan, "finished" yoki "in-progress")
 *     responses:
 *       200:
 *         description: SigninCourse status muvaffaqiyatli yangilandi
 *       400:
 *         description: Yomon so'rov
 *       404:
 *         description: SigninCourse topilmadi
 *       500:
 *         description: Server xatosi
 */
signinCourseRouter.patch("/:id", finish);
export default signinCourseRouter