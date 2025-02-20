import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/majority.controller.js";
import upload from "../multer/multerMajority.js";

const majorityRouter = Router()

/**
 * @swagger
 * /majority:
 *   get:
 *     summary: Barcha majority'larni ko'rish
 *     description: Barcha majority'lar ro'yxatini olish.
 *     tags:
 *       - Majority
 *     responses:
 *       200:
 *         description: Barcha majority'lar muvaffaqiyatli ko'rsatiladi
 *       500:
 *         description: Server xatosi
 */
majorityRouter.get("/", findAll);

/**
 * @swagger
 * /majority/{id}:
 *   get:
 *     summary: Majority'ni ID orqali ko'rish
 *     description: Berilgan IDga asoslanib majority'ni ko'rsatish.
 *     tags:
 *       - Majority
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ko'rsatilishi kerak bo'lgan majority'ning IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Majority muvaffaqiyatli topildi
 *       404:
 *         description: Majority topilmadi
 *       500:
 *         description: Server xatosi
 */
majorityRouter.get("/:id", findOne);

/**
 * @swagger
 * /majority:
 *   post:
 *     summary: Yangi majority yaratish
 *     description: Yangi majority yaratish uchun ma'lumot yuborish.
 *     tags:
 *       - Majority
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Majority nomi
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Majority rasmi
 *               subjectId:
 *                 type: integer
 *                 description: Subject ID
 *     responses:
 *       201:
 *         description: Majority muvaffaqiyatli yaratildi
 *       400:
 *         description: Yomon so'rov
 *       500:
 *         description: Server xatosi
 */
majorityRouter.post("/", upload.single("photo"), create);

/**
 * @swagger
 * /majority/{id}:
 *   patch:
 *     summary: Majority'ni yangilash
 *     description: Berilgan IDga asoslanib majority'ni yangilash.
 *     tags:
 *       - Majority
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanishi kerak bo'lgan majority'ning IDsi
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
 *                 description: Majority nomini yangilash
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Majority rasmini yangilash
 *     responses:
 *       200:
 *         description: Majority muvaffaqiyatli yangilandi
 *       400:
 *         description: Yomon so'rov
 *       404:
 *         description: Majority topilmadi
 *       500:
 *         description: Server xatosi
 */
majorityRouter.patch("/:id", upload.single("photo"), update);

/**
 * @swagger
 * /majority/{id}:
 *   delete:
 *     summary: Majority'ni o'chirish
 *     description: Berilgan IDga asoslanib majority'ni o'chirish.
 *     tags:
 *       - Majority
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chirilishi kerak bo'lgan majority'ning IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Majority muvaffaqiyatli o'chirildi
 *       404:
 *         description: Majority topilmadi
 *       500:
 *         description: Server xatosi
 */
majorityRouter.delete("/:id", remove);
export default majorityRouter