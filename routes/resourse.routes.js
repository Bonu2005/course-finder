import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/resourse.controller.js";
import upload from "../multer/multerResourse.js";

const resourseRouter = Router()

/**
 * @swagger
 * /resourse:
 *   get:
 *     summary: Barcha resurslarni ko'rish
 *     description: Barcha resurslar ro'yxatini olish.
 *     tags:
 *       - Resourse
 *     responses:
 *       200:
 *         description: Barcha resurslar muvaffaqiyatli ko'rsatiladi
 *       500:
 *         description: Server xatosi
 */
resourseRouter.get("/", findAll);

/**
 * @swagger
 * /resourse/{id}:
 *   get:
 *     summary: Resursni ID orqali ko'rish
 *     description: Berilgan IDga asoslanib resursni ko'rsatish.
 *     tags:
 *       - Resourse
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ko'rsatilishi kerak bo'lgan resursning IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Resurs muvaffaqiyatli topildi
 *       404:
 *         description: Resurs topilmadi
 *       500:
 *         description: Server xatosi
 */
resourseRouter.get("/:id", findOne);

/**
 * @swagger
 * /resourse:
 *   post:
 *     summary: Yangi resurs yaratish
 *     description: Yangi resurs yaratish uchun ma'lumot yuborish.
 *     tags:
 *       - Resourse
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Resurs nomi
 *               media:
 *                 type: string
 *                 description: Resurs media fayli
 *               description:
 *                 type: string
 *                 description: Resurs tavsifi
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Resurs rasmi (Fayl)
 *     responses:
 *       201:
 *         description: Resurs muvaffaqiyatli yaratildi
 *       400:
 *         description: Yomon so'rov
 *       500:
 *         description: Server xatosi
 */
resourseRouter.post("/", upload.single("photo"), create);

/**
 * @swagger
 * /resourse/{id}:
 *   patch:
 *     summary: Resursni yangilash
 *     description: Berilgan IDga asoslanib resursni yangilash.
 *     tags:
 *       - Resourse
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanishi kerak bo'lgan resursning IDsi
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Resurs nomini yangilash
 *               media:
 *                 type: string
 *                 description: Media faylni yangilash
 *               description:
 *                 type: string
 *                 description: Resurs tavsifini yangilash
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Resurs rasmi (Fayl)
 *     responses:
 *       200:
 *         description: Resurs muvaffaqiyatli yangilandi
 *       400:
 *         description: Yomon so'rov
 *       404:
 *         description: Resurs topilmadi
 *       500:
 *         description: Server xatosi
 */
resourseRouter.patch("/:id", upload.single("photo"), update);

/**
 * @swagger
 * /resourse/{id}:
 *   delete:
 *     summary: Resursni o'chirish
 *     description: Berilgan IDga asoslanib resursni o'chirish.
 *     tags:
 *       - Resourse
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chirilishi kerak bo'lgan resursning IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Resurs muvaffaqiyatli o'chirildi
 *       404:
 *         description: Resurs topilmadi
 *       500:
 *         description: Server xatosi
 */
resourseRouter.delete("/:id", remove);
export default resourseRouter