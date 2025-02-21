import { Router } from "express";
import { create, remove } from "../controllers/like.controller.js";

const likeRouter = Router()

/**
 * @swagger
 * /like:
 *   post:
 *     summary: Filialga layk qo'shish
 *     description: Foydalanuvchi tomonidan filialga layk qo'shish.
 *     tags:
 *       - Like
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: Foydalanuvchining IDsi
 *               centerId:
 *                 type: integer
 *                 description: Markazning IDsi
 *     responses:
 *       201:
 *         description: Layk muvaffaqiyatli qo'shildi
 *       400:
 *         description: Yomon so'rov
 *       500:
 *         description: Server xatosi
 */
likeRouter.post("/", create);

/**
 * @swagger
 * /like/{id}:
 *   delete:
 *     summary: Laykni o'chirish
 *     description: Berilgan IDga asoslanib laykni o'chirish.
 *     tags:
 *       - Like
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chirilishi kerak bo'lgan laykning IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Layk muvaffaqiyatli o'chirildi
 *       404:
 *         description: Layk topilmadi
 *       500:
 *         description: Server xatosi
 */
likeRouter.delete("/:id", remove);  
export default likeRouter