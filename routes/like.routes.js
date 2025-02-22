import { Router } from "express";
import { create, remove } from "../controllers/like.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const likeRouter = Router()

likeRouter.post("/",verifyToken, create);

likeRouter.delete("/:id",verifyToken, remove);  
export default likeRouter

/**
 * @swagger
 * tags:
 *   - name: Like
 *     description: "Like bilan bog'liq barcha amallar"
 */

/**
 * @swagger
 * /like:
 *   post:
 *     summary: "Yangi layk yaratish"
 *     description: "Bu so'rovda yangi layk yaratiladi. Foydalanuvchi autentifikatsiya qilinishi kerak. `centerId` orqali ma'lum bir markazga layk yuboriladi. Foydalanuvchi ID'si token orqali olinadi."
 *     operationId: createLike
 *     tags:
 *       - Like
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               centerId:
 *                 type: integer
 *                 description: "Layk yuboriladigan markazning ID."
 *                 example: 1
 *     responses:
 *       201:
 *         description: "Layk muvaffaqiyatli yaratildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Layk muvaffaqiyatli yaratildi"
 *       400:
 *         description: "Noto'g'ri so'rov parametrlar"
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan"
 *       500:
 *         description: "Ichki server xatosi"
 */

/**
 * @swagger
 * /like/{id}:
 *   delete:
 *     summary: "Laykni o'chirish"
 *     description: "Bu so'rovda berilgan IDga ega layk o'chiriladi. Foydalanuvchi autentifikatsiya qilinishi kerak. Foydalanuvchi faqat o'zining yuborgan laykini o'chirishi mumkin."
 *     operationId: deleteLike
 *     tags:
 *       - Like
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "O'chirilishi kerak bo'lgan laykning ID."
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: "Layk muvaffaqiyatli o'chirildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Layk muvaffaqiyatli o'chirildi"
 *       400:
 *         description: "Layk topilmadi yoki foydalanuvchi o'z laykini o'chirmoqchi emas"
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan"
 *       403:
 *         description: "Foydalanuvchi faqat o'zining laykini o'chirishi mumkin"
 *       500:
 *         description: "Ichki server xatosi"
 */
