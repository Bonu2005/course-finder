import { Router } from "express";
import { create, findAll, findOne, remove, removeMajority, update } from "../controllers/center.controller.js";
import upload from "../multer/multerMajority.js";

const centerRouter = Router()
/**
 * @swagger
 * /center:
 *   get:
 *     summary: Barcha markazlarni ko'rsatish
 *     description: Barcha markazlar ro'yxatini olish.
 *     tags:
 *       - Center
 *     responses:
 *       200:
 *         description: Markazlar muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Markazning IDsi
 *                   name:
 *                     type: string
 *                     description: Markaz nomi
 *                   location:
 *                     type: string
 *                     description: Markaz manzili
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Markaz yaratish sanasi
 *       500:
 *         description: Server xatosi
 */
centerRouter.get("/", findAll);
/**
 * @swagger
 * /center/{id}:
 *   get:
 *     summary: Markazni ID bo'yicha ko'rsatish
 *     description: Berilgan ID bo'yicha markaz ma'lumotlarini olish.
 *     tags:
 *       - Center
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Markazning IDsi
 *         type: string
 *     responses:
 *       200:
 *         description: Markaz ma'lumotlari muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Markazning IDsi
 *                 name:
 *                   type: string
 *                   description: Markaz nomi
 *                 location:
 *                   type: string
 *                   description: Markaz manzili
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Markaz yaratish sanasi
 *       404:
 *         description: Markaz topilmadi
 *       500:
 *         description: Server xatosi
 */
centerRouter.get("/:id", findOne);
/**
 * @swagger
 * /center:
 *   post:
 *     summary: Yangi markaz yaratish
 *     description: Yangi markaz yaratish uchun zarur bo'lgan ma'lumotlarni yuboradi.
 *     tags:
 *       - Center
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Markaz nomi
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Markaz rasmi
 *               regionId:
 *                 type: integer
 *                 description: Region IDsi
 *               address:
 *                 type: string
 *                 description: Markaz manzili
 *               userId:
 *                 type: integer
 *                 description: Foydalanuvchi IDsi (markaz bilan bog'liq)
 *     responses:
 *       201:
 *         description: Markaz muvaffaqiyatli yaratildi
 *       400:
 *         description: Yomon so'rov
 *       500:
 *         description: Server xatosi
 */
centerRouter.post("/", upload.single("photo"), create);

/**
 * @swagger
 * /center/{id}:
 *   patch:
 *     summary: Markazni yangilash
 *     description: Berilgan IDga asoslanib markaz ma'lumotlarini yangilash (shu jumladan rasmni).
 *     tags:
 *       - Center
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanishi kerak bo'lgan markazning IDsi
 *         type: string
 *       - in: formData
 *         name: name
 *         type: string
 *         description: Markaz nomi (yangilash)
 *         example: "Yangi Markaz Nomi"
 *       - in: formData
 *         name: photo
 *         type: file
 *         description: Markazning yangi rasmi
 *       - in: formData
 *         name: userId
 *         type: integer
 *         description: Markaz bilan bog'liq foydalanuvchi IDsi (yangilash)
 *         example: 1
 *       - in: formData
 *         name: regionId
 *         type: integer
 *         description: Markaz joylashgan yangi hudud IDsi
 *         example: 3
 *       - in: formData
 *         name: address
 *         type: string
 *         description: Markaz manzili (yangilash)
 *         example: "Toshkent, Yangi Manzil"
 *     responses:
 *       200:
 *         description: Markaz muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Markazning IDsi
 *                 name:
 *                   type: string
 *                   description: Markaz nomi
 *                 photo:
 *                   type: string
 *                   description: Markaz rasmi (yuklangan fayl)
 *                 userId:
 *                   type: integer
 *                   description: Markaz bilan bog'liq foydalanuvchi IDsi
 *                 regionId:
 *                   type: integer
 *                   description: Markaz joylashgan hudud IDsi
 *                 address:
 *                   type: string
 *                   description: Markaz manzili
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Markaz yangilanish sanasi
 *       400:
 *         description: Noto'g'ri yoki yetarlicha ma'lumotlar
 *       404:
 *         description: Markaz topilmadi
 *       500:
 *         description: Server xatosi
 */
centerRouter.patch("/:id", upload.single("photo"), update);
/**
 * @swagger
 * /center/{id}:
 *   delete:
 *     summary: Markazni o'chirish
 *     description: Berilgan IDga asoslanib markazni o'chirish.
 *     tags:
 *       - Center
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chirilishi kerak bo'lgan markazning IDsi
 *         type: string
 *     responses:
 *       200:
 *         description: Markaz muvaffaqiyatli o'chirildi
 *       404:
 *         description: Markaz topilmadi
 *       500:
 *         description: Server xatosi
 */
centerRouter.delete("/:id", remove);
/**
 * @swagger
 * /center/majority/{id}:
 *   delete:
 *     summary: Ko'pchilikni o'chirish
 *     description: Berilgan IDga asoslanib ko'pchilikni o'chirish.
 *     tags:
 *       - Center
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chirilishi kerak bo'lgan ko'pchilikning IDsi
 *         type: string
 *     responses:
 *       200:
 *         description: Ko'pchilik muvaffaqiyatli o'chirildi
 *       404:
 *         description: Ko'pchilik topilmadi
 *       500:
 *         description: Server xatosi
 */
centerRouter.delete("/majority/:id", removeMajority);
export default centerRouter