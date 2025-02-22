import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/comment.controller.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";

const commentRouter = Router()

commentRouter.get("/",verifyToken, findAll);

commentRouter.get("/:id",verifyToken, verifyRole(["ADMIN"]), findOne)

commentRouter.post("/",verifyToken, verifyRole(["ADMIN", "USER"]), create)

commentRouter.patch("/:id", verifyToken, verifyRole(["ADMIN", "USER"]), update)

commentRouter.delete("/:id", verifyToken, verifyRole(["ADMIN", "USER"]), remove)
export default commentRouter

/**
 * @swagger
 * tags:
 *   - name: Comment
 *     description: Comment bilan bog'liq barcha amallars
 */

/**
 * @swagger
 * /comment:
 *   get:
 *     summary: "Barcha kommentariylarni olish"
 *     description: "Bu so'rov barcha kommentariylarni olish uchun ishlatiladi. Paginatsiya, saralash va filtratsiya imkoniyatlari mavjud."
 *     operationId: getAllComments
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: "Sahifa raqami, standart: 1."
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         required: false
 *         description: "Har bir sahifadagi elementlar soni, standart: 10."
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortBy
 *         required: false
 *         description: "Saralash uchun maydon."
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         description: "Saralash tartibi. Default: 'ASC'. (masalan, 'ASC' yoki 'DESC')"
 *         schema:
 *           type: string
 *       - in: query
 *         name: filter
 *         required: false
 *         description: "Filtr parametrlari (masalan, komentariy nomi, statusi va boshqalar)."
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: "Kommentariylar muvaffaqiyatli qaytarildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: "Noto'g'ri so'rov parametrlari."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       500:
 *         description: "Ichki server xatosi."
 */


/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: "Ma'lum bir kommentariyani olish"
 *     description: "Bu so'rov ma'lum bir kommentariyani ID orqali olish uchun ishlatiladi. Foydalanuvchi 'ADMIN' roliga ega bo'lishi kerak."
 *     operationId: getCommentById
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "Kommentariyaning ID raqami."
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Kommentariy muvaffaqiyatli qaytarildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 content:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: "Noto'g'ri ID."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       500:
 *         description: "Ichki server xatosi."
 */

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: "Yangi kommentariya yaratish"
 *     description: "Bu so'rov yangi kommentariya yaratadi. Foydalanuvchi 'ADMIN' yoki 'USER' roliga ega bo'lishi kerak. Ma'lumotlar 'application/json' orqali yuboriladi."
 *     operationId: createComment
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg_text:
 *                 type: string
 *                 description: "Kommentariya matni."
 *               star:
 *                 type: integer
 *                 description: "Yulduzlar soni (1-5)."
 *               centerId:
 *                 type: integer
 *                 description: "Markaz ID raqami."
 *     responses:
 *       201:
 *         description: "Kommentariya muvaffaqiyatli yaratildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 msg_text:
 *                   type: string
 *                 star:
 *                   type: integer
 *                 centerId:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *       400:
 *         description: "Noto'g'ri ma'lumotlar yuborilgan."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       500:
 *         description: "Ichki server xatosi."
 */

/**
 * @swagger
 * /comment/{id}:
 *   patch:
 *     summary: "Kommentariyani yangilash"
 *     description: "Bu so'rov mavjud kommentariyani yangilaydi. Foydalanuvchi 'ADMIN' yoki 'USER' roliga ega bo'lishi kerak. Agar qiymat kiritilmasa, eski qiymat saqlanadi."
 *     operationId: updateComment
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Kommentariyaning ID raqami.
 *         schema:
 *           type: integer
 *       - in: body
 *         name: comment
 *         required: false
 *         description: Yangilanishi kerak bo'lgan kommentariya ma'lumotlari.
 *         schema:
 *           type: object
 *           properties:
 *             msg_text:
 *               type: string
 *               description: "Kommentariya matni."
 *             star:
 *               type: integer
 *               description: "Yulduzlar soni (1-5)."
 *             centerId:
 *               type: integer
 *               description: "Markaz ID raqami."
 *     responses:
 *       200:
 *         description: "Kommentariya muvaffaqiyatli yangilandi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 msg_text:
 *                   type: string
 *                 star:
 *                   type: integer
 *                 centerId:
 *                   type: integer
 *       400:
 *         description: "Noto'g'ri ma'lumotlar yuborilgan."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       404:
 *         description: "Komentariya topilmadi."
 *       500:
 *         description: "Ichki server xatosi."
 */
/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: "Kommentariya o'chirish"
 *     description: "Bu so'rovda mavjud kommentariya o'chiriladi. Foydalanuvchi 'ADMIN' yoki o'zining kommentariyasini o'chirish huquqiga ega bo'lishi kerak."
 *     operationId: removeComment
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Kommentariyaning ID raqami.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Kommentariya muvaffaqiyatli o'chirildi."
 *       400:
 *         description: "Noto'g'ri ma'lumotlar yuborilgan."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kommentariyani o'chirish huquqi yo'q."
 *       404:
 *         description: "Kommentariya topilmadi."
 *       500:
 *         description: "Ichki server xatosi."
 */
