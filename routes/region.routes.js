import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/region.controller.js";
const regionRouter = Router()
/**
 * @swagger
 * /region:
 *   get:
 *     summary: Barcha region'larni ko'rish
 *     description: Barcha region'lar ro'yxatini olish.
 *     tags:
 *       - Region
 *     responses:
 *       200:
 *         description: Barcha region'lar muvaffaqiyatli ko'rsatiladi
 *       500:
 *         description: Server xatosi
 */
regionRouter.get("/", findAll);

/**
 * @swagger
 * /region/{id}:
 *   get:
 *     summary: Region'ni ID orqali ko'rish
 *     description: Berilgan IDga asoslanib region'ni ko'rsatish.
 *     tags:
 *       - Region
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ko'rsatilishi kerak bo'lgan region'ning IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Region muvaffaqiyatli topildi
 *       404:
 *         description: Region topilmadi
 *       500:
 *         description: Server xatosi
 */
regionRouter.get("/:id", findOne);

/**
 * @swagger
 * /region:
 *   post:
 *     summary: Yangi region yaratish
 *     description: Yangi region yaratish uchun ma'lumot yuborish.
 *     tags:
 *       - Region
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Region nomi
 *     responses:
 *       201:
 *         description: Region muvaffaqiyatli yaratildi
 *       400:
 *         description: Yomon so'rov
 *       500:
 *         description: Server xatosi
 */
regionRouter.post("/", create);

/**
 * @swagger
 * /region/{id}:
 *   patch:
 *     summary: Region'ni yangilash
 *     description: Berilgan IDga asoslanib region'ni yangilash.
 *     tags:
 *       - Region
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanishi kerak bo'lgan region'ning IDsi
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Region nomini yangilash
 *     responses:
 *       200:
 *         description: Region muvaffaqiyatli yangilandi
 *       400:
 *         description: Yomon so'rov
 *       404:
 *         description: Region topilmadi
 *       500:
 *         description: Server xatosi
 */
regionRouter.patch("/:id", update);

/**
 * @swagger
 * /region/{id}:
 *   delete:
 *     summary: Region'ni o'chirish
 *     description: Berilgan IDga asoslanib region'ni o'chirish.
 *     tags:
 *       - Region
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chirilishi kerak bo'lgan region'ning IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Region muvaffaqiyatli o'chirildi
 *       404:
 *         description: Region topilmadi
 *       500:
 *         description: Server xatosi
 */
regionRouter.delete("/:id", remove);    
export default regionRouter