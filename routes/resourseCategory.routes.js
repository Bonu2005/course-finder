import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/resourseCategory.controller.js";
import upload from "../multer/multerResourse.js";

const resourseCategoryRouter = Router()

/**
 * @swagger
 * /resourseCategory:
 *   get:
 *     summary: Barcha resurs kategoriyalarini ko'rish
 *     description: Barcha resurs kategoriyalarining ro'yxatini olish.
 *     tags:
 *       - ResourseCategory
 *     responses:
 *       200:
 *         description: Barcha resurs kategoriyalari muvaffaqiyatli ko'rsatiladi
 *       500:
 *         description: Server xatosi
 */
resourseCategoryRouter.get("/", findAll);

/**
 * @swagger
 * /resourseCategory/{id}:
 *   get:
 *     summary: Resurs kategoriyasini ID orqali ko'rish
 *     description: Berilgan IDga asoslanib resurs kategoriyasini ko'rsatish.
 *     tags:
 *       - ResourseCategory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ko'rsatilishi kerak bo'lgan resurs kategoriyasining IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Resurs kategoriyasi muvaffaqiyatli topildi
 *       404:
 *         description: Resurs kategoriyasi topilmadi
 *       500:
 *         description: Server xatosi
 */
resourseCategoryRouter.get("/:id", findOne);

/**
 * @swagger
 * /resourseCategory:
 *   post:
 *     summary: Yangi resurs kategoriyasini yaratish
 *     description: Yangi resurs kategoriyasini yaratish uchun ma'lumot yuborish.
 *     tags:
 *       - ResourseCategory
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Resurs kategoriyasining nomi
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Resurs kategoriyasining rasmi (Fayl)
 *     responses:
 *       201:
 *         description: Resurs kategoriyasi muvaffaqiyatli yaratildi
 *       400:
 *         description: Yomon so'rov
 *       500:
 *         description: Server xatosi
 */
resourseCategoryRouter.post("/", upload.single("photo"), create);

/**
 * @swagger
 * /resourseCategory/{id}:
 *   patch:
 *     summary: Resurs kategoriyasini yangilash
 *     description: Berilgan IDga asoslanib resurs kategoriyasini yangilash.
 *     tags:
 *       - ResourseCategory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanishi kerak bo'lgan resurs kategoriyasining IDsi
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
 *                 description: Resurs kategoriyasining nomini yangilash
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Resurs kategoriyasining rasmini yangilash (Fayl)
 *     responses:
 *       200:
 *         description: Resurs kategoriyasi muvaffaqiyatli yangilandi
 *       400:
 *         description: Yomon so'rov
 *       404:
 *         description: Resurs kategoriyasi topilmadi
 *       500:
 *         description: Server xatosi
 */
resourseCategoryRouter.patch("/:id", upload.single("photo"), update);

/**
 * @swagger
 * /resourseCategory/{id}:
 *   delete:
 *     summary: Resurs kategoriyasini o'chirish
 *     description: Berilgan IDga asoslanib resurs kategoriyasini o'chirish.
 *     tags:
 *       - ResourseCategory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chirilishi kerak bo'lgan resurs kategoriyasining IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Resurs kategoriyasi muvaffaqiyatli o'chirildi
 *       404:
 *         description: Resurs kategoriyasi topilmadi
 *       500:
 *         description: Server xatosi
 */
resourseCategoryRouter.delete("/:id", remove);


export default resourseCategoryRouter