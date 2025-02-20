import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/subject.controller.js";
import upload from "../multer/multerMajority.js";

const subjectRouter = Router()

/**
 * @swagger
 * /subject:
 *   get:
 *     summary: Barcha subjectlar ro'yxatini olish
 *     description: Foydalanuvchilar va o'qituvchilar uchun barcha subjectlar ro'yxatini olish.
 *     tags:
 *       - Subject
 *     responses:
 *       200:
 *         description: Barcha subjectlar muvaffaqiyatli ko'rsatiladi
 *       500:
 *         description: Server xatosi
 */
subjectRouter.get("/", findAll);

/**
 * @swagger
 * /subject/{id}:
 *   get:
 *     summary: ID orqali subjectni olish
 *     description: Berilgan IDga asoslangan subjectni olish.
 *     tags:
 *       - Subject
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Subject ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli subject topildi
 *       404:
 *         description: Subject topilmadi
 */
subjectRouter.get("/:id", findOne);

/**
 * @swagger
 * /subject:
 *   post:
 *     summary: Yangi subject yaratish
 *     description: Yangi subject yaratish uchun kerakli ma'lumotlarni yuborish.
 *     tags:
 *       - Subject
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Subject nomi
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Subjectga tegishli tasvir
 *               type:
 *                 type: string
 *                 description: Subject turi
 *     responses:
 *       201:
 *         description: Yangi subject muvaffaqiyatli yaratildi
 *       400:
 *         description: Yomon so'rov
 *       500:
 *         description: Server xatosi
 */
subjectRouter.post("/", upload.single("photo"), create);

/**
 * @swagger
 * /subject/{id}:
 *   patch:
 *     summary: Subjectni yangilash
 *     description: Berilgan IDga asoslanib subjectni yangilash, masalan, rasm va nomni o'zgartirish.
 *     tags:
 *       - Subject
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Subject ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Yangilangan subject nomi
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Yangilangan subjectga tegishli tasvir
 *               type:
 *                 type: string
 *                 description: Yangilangan subject turi
 *     responses:
 *       200:
 *         description: Subject muvaffaqiyatli yangilandi
 *       400:
 *         description: Yomon so'rov
 *       404:
 *         description: Subject topilmadi
 *       500:
 *         description: Server xatosi
 */
subjectRouter.patch("/:id", upload.single("photo"), update);

/**
 * @swagger
 * /subject/{id}:
 *   delete:
 *     summary: Subjectni o'chirish
 *     description: Berilgan IDga asoslanib subjectni o'chirish.
 *     tags:
 *       - Subject
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Subject ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subject muvaffaqiyatli o'chirildi
 *       404:
 *         description: Subject topilmadi
 *       500:
 *         description: Server xatosi
 */
subjectRouter.delete("/:id", remove);
export default subjectRouter
