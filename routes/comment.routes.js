import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/comment.controller.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";

const commentRouter = Router()

commentRouter.get("/",findAll);

commentRouter.get("/:id",findOne);

commentRouter.post("/",verifyToken, create);

commentRouter.patch("/:id",verifyToken,  update);

commentRouter.delete("/:id",verifyToken,  remove);

/**
 * @swagger
 * /comment:
 *   get:
 *     summary: Barcha izohlarni olish
 *     description: Barcha izohlarni qaytaradi.
 *     tags:
 *       - Comment
 *     responses:
 *       200:
 *         description: Barcha izohlar muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   msg_text:
 *                     type: string
 *                     description: Izoh matni
 *                   userId:
 *                     type: integer
 *                     description: Foydalanuvchi IDsi
 *                   star:
 *                     type: integer
 *                     description: Yulduzlar soni (reyting)
 *                   centerId:
 *                     type: integer
 *                     description: Markaz IDsi
 *       500:
 *         description: Server xatosi
 */
commentRouter.get("/", findAll);
/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Izohni ID bo'yicha olish
 *     description: Berilgan IDga asoslanib biror izohni olish.
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Izohning IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Izoh muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg_text:
 *                   type: string
 *                   description: Izoh matni
 *                 userId:
 *                   type: integer
 *                   description: Foydalanuvchi IDsi
 *                 star:
 *                   type: integer
 *                   description: Yulduzlar soni
 *                 centerId:
 *                   type: integer
 *                   description: Markaz IDsi
 *       404:
 *         description: Izoh topilmadi
 *       500:
 *         description: Server xatosi
 */
commentRouter.get("/:id",verifyToken, verifyRole(["admin"]), findOne)
/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Yangi izoh yaratish
 *     description: Yangi izoh yaratish uchun zarur bo'lgan ma'lumotlarni yuboradi.
 *     tags:
 *       - Comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg_text:
 *                 type: string
 *                 description: Izoh matni
 *               userId:
 *                 type: integer
 *                 description: Foydalanuvchi IDsi
 *               star:
 *                 type: integer
 *                 description: Yulduzlar soni (reyting)
 *               centerId:
 *                 type: integer
 *                 description: Markaz IDsi
 *     responses:
 *       201:
 *         description: Izoh muvaffaqiyatli yaratildi
 *       400:
 *         description: Yomon so'rov
 *       500:
 *         description: Server xatosi
 */
commentRouter.post("/",verifyToken, verifyRole(["admin", "user"]), create)
/**
 * @swagger
 * /comment/{id}:
 *   patch:
 *     summary: Izohni yangilash
 *     description: Berilgan IDga asoslanib izohni yangilash.
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Izohning IDsi
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg_text:
 *                 type: string
 *                 description: Yangi izoh matni
 *               star:
 *                 type: integer
 *                 description: Yulduzlar soni (reyting)
 *     responses:
 *       200:
 *         description: Izoh muvaffaqiyatli yangilandi
 *       400:
 *         description: Yomon so'rov
 *       404:
 *         description: Izoh topilmadi
 *       500:
 *         description: Server xatosi
 */
commentRouter.patch("/:id", verifyToken, verifyRole(["admin", "user"]), update)
/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Izohni o'chirish
 *     description: Berilgan IDga asoslanib izohni o'chirish.
 *     tags:
 *       - Comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chirilishi kerak bo'lgan izohning IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Izoh muvaffaqiyatli o'chirildi
 *       404:
 *         description: Izoh topilmadi
 *       500:
 *         description: Server xatosi
 */
commentRouter.delete("/:id", verifyToken, verifyRole(["admin", "user"]), remove)
export default commentRouter