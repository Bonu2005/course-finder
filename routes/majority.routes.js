import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/majority.controller.js";
import upload from "../multer/MajorityMulter.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";

const majorityRouter = Router()


majorityRouter.get("/", findAll);

majorityRouter.get("/:id", findOne);

majorityRouter.post("/",verifyToken,verifyRole('ADMIN'), upload.single("photo"), create);

majorityRouter.patch("/:id",verifyToken,verifyRole('ADMIN'), upload.single("photo"), update);

majorityRouter.delete("/:id",verifyToken,verifyRole('ADMIN'), remove);

export default majorityRouter
/**
 * @swagger
 * tags:
 *   - name: Majority
 *     description: "Majority bilan bog'liq barcha amallar"
 */

/**
 * @swagger
 * /majority:
 *   get:
 *     summary: "Barcha katta ko'pchiliklarni olish"
 *     description: "Ushbu so'rov katta ko'pchiliklar ro'yxatini qaytaradi. Sahifalash, saralash va filtrlar bilan."
 *     operationId: findAllMajority
 *     tags:
 *       - Majority
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: "Qaytarilishi kerak bo'lgan sahifa raqami. Default: 1."
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         required: false
 *         description: "Sahifadagi elementlar soni. Default: 10."
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortBy
 *         required: false
 *         description: "Saralash uchun maydon. Masalan, 'name'."
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         description: "Saralash tartibi. Default: 'ASC'. (masalan, 'ASC' yoki 'DESC')."
 *         schema:
 *           type: string
 *       - in: query
 *         name: filter
 *         required: false
 *         description: "Filtr parametrlarini qo'llash (masalan, katta ko'pchilik nomi yoki holati)."
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: "Katta ko'pchiliklar muvaffaqiyatli qaytarildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       400:
 *         description: "Noto'g'ri so'rov parametrlar"
 *       500:
 *         description: "Ichki server xatosi"
 */

/**
 * @swagger
 * /majority/{id}:
 *   get:
 *     summary: "Katta ko'pchilikni olish"
 *     description: "Ushbu so'rov katta ko'pchilikni ID bo'yicha qaytaradi."
 *     operationId: findOneMajority
 *     tags:
 *       - Majority
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "Katta ko'pchilikni aniqlovchi ID."
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Katta ko'pchilik muvaffaqiyatli qaytarildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       400:
 *         description: "ID noto'g'ri yoki noaniq."
 *       404:
 *         description: "Katta ko'pchilik topilmadi."
 *       500:
 *         description: "Ichki server xatosi"
 */


/**
 * @swagger
 * /majority:
 *   post:
 *     summary: "Yangi katta ko'pchilik yaratish"
 *     description: "Bu so'rovda yangi katta ko'pchilik yaratish. Foydalanuvchi 'ADMIN' roliga ega bo'lishi kerak. Ma'lumotlar `form-data` orqali yuboriladi, jumladan rasm (foto)."
 *     operationId: createMajority
 *     tags:
 *       - Majority
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Katta ko'pchilik nomi."
 *                 example: "Katta Ko'pchilik 1"
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: "Katta ko'pchilik uchun rasm (foto)."
 *               subjectId:
 *                 type: integer
 *                 description: "Predmet ID si."
 *                 example: 1
 *     responses:
 *       201:
 *         description: "Katta ko'pchilik muvaffaqiyatli yaratildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 photo:
 *                   type: string
 *                 subjectId:
 *                   type: integer
 *       400:
 *         description: "Yuborilgan ma'lumotlar noto'g'ri yoki yetarli emas."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       500:
 *         description: "Ichki server xatosi"
 */


/**
 * @swagger
 * /majority/{id}:
 *   patch:
 *     summary: "Katta ko'pchilikni yangilash"
 *     description: "Bu so'rovda katta ko'pchilikni ID bo'yicha yangilash. Foydalanuvchi 'ADMIN' roliga ega bo'lishi kerak. Yangi rasm (foto) va boshqa ma'lumotlar `form-data` orqali yuboriladi. Agar ma'lumotlar yuborilmasa, eski qiymatlar saqlanadi."
 *     operationId: updateMajority
 *     tags:
 *       - Majority
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "Yangilanayotgan katta ko'pchilikni aniqlovchi ID."
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Katta ko'pchilik nomi."
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: "Katta ko'pchilik uchun yangi rasm (foto)."
 *               subjectId:
 *                 type: integer
 *                 description: "Yangi predmet ID si."
 *     responses:
 *       200:
 *         description: "Katta ko'pchilik muvaffaqiyatli yangilandi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 photo:
 *                   type: string
 *                 subjectId:
 *                   type: integer
 *       400:
 *         description: "Yuborilgan ma'lumotlar noto'g'ri yoki yetarli emas."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       404:
 *         description: "Katta ko'pchilik topilmadi."
 *       500:
 *         description: "Ichki server xatosi"
 */

/**
 * @swagger
 * /majority/{id}:
 *   delete:
 *     summary: "Katta ko'pchilikni o'chirish"
 *     description: "Bu so'rovda katta ko'pchilikni ID bo'yicha o'chirish. Foydalanuvchi 'ADMIN' roliga ega bo'lishi kerak. O'chirish operatsiyasi faqat autentifikatsiya qilingan foydalanuvchilar uchun ishlaydi."
 *     operationId: deleteMajority
 *     tags:
 *       - Majority
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "O'chirilayotgan katta ko'pchilikni aniqlovchi ID."
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Katta ko'pchilik muvaffaqiyatli o'chirildi."
 *       400:
 *         description: "Noto'g'ri ID yoki so'rov parametrlari."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       404:
 *         description: "Katta ko'pchilik topilmadi."
 *       500:
 *         description: "Ichki server xatosi"
 */
