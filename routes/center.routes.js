import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/center.controller.js";
import upload from "../multer/CentersMulter.js"
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyType from "../middlewares/verifyType.js";

const centerRouter = Router()

centerRouter.get("/",verifyToken,verifyType(['ADMIN','CEO']), findAll);

centerRouter.get("/:id",verifyToken,verifyType(['ADMIN','CEO']), findOne);

centerRouter.post("/",verifyToken,verifyType(["CEO"]),upload.single("photo"), create);

centerRouter.patch("/:id", verifyType(["CEO"]),upload.single("photo"), update);

centerRouter.delete("/:id",verifyType(["CEO"]) ,remove);

export default centerRouter

/**
 * @swagger
 * tags:
 *   - name: Center
 *     description: Center bilan bog'liq barcha amallars
 */

/**
 * @swagger
 * /center:
 *   get:
 *     summary: "Markazlar ro'yxatini olish"
 *     description: "Bu so'rov markazlar ro'yxatini qaytaradi. Paginatsiya, saralash va filtratsiya parametrlari qo'llab-quvvatlanadi."
 *     operationId: getCenters
 *     tags:
 *       - Center
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: "Olingan sahifa raqami. Default: 1."
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
 *         description: "Saralash uchun maydon nomi."
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         description: "Saralash tartibi. Default: 'ASC' (masalan, 'ASC' yoki 'DESC')."
 *         schema:
 *           type: string
 *       - in: query
 *         name: filter
 *         required: false
 *         description: "Filtr parametrlari (masalan, markaz nomi, status va hokazo)."
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: "Markazlar ro'yxati muvaffaqiyatli qaytarildi."
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
 *                   photo:
 *                     type: string
 *                   location:
 *                     type: string
 *                   regionId:
 *                     type: integer
 *       400:
 *         description: "Noto'g'ri so'rov parametrlaridan foydalanilgan."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       500:
 *         description: "Ichki server xatosi"
 */



/**
 * @swagger
 * /center/{id}:
 *   get:
 *     summary: Markazni ID bo'yicha olish
 *     description: Ushbu so'rov markazning batafsil ma'lumotlarini ID bo'yicha qaytaradi. Faqat 'ADMIN' yoki 'CEO' roliga ega foydalanuvchilar foydalanishi mumkin.
 *     operationId: getCenterById
 *     tags:
 *       - Center
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Markazning unikalligi bo'yicha ID raqami.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Markazning ma'lumotlari muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *       400:
 *         description: Noto'g'ri so'rov parametrlar
 *       401:
 *         description: Avtorizatsiya qilinmagan foydalanuvchi
 *       403:
 *         description: Foydalanuvchida kerakli ruxsat yo'q
 *       404:
 *         description: Markaz topilmadi
 *       500:
 *         description: Ichki server xatosi
 */

/**
 * @swagger
 * /center:
 *   post:
 *     summary: Yangi markaz yaratish
 *     description: Ushbu so'rov yangi markazni yaratadi. Foydalanuvchi 'CEO' roliga ega bo'lishi kerak. Ma'lumotlar `form-data` orqali yuboriladi, shu jumladan rasm (foto) va `majors` identifikatorlari.
 *     operationId: createCenter
 *     tags:
 *       - Center
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
 *                 description: Markaz nomi.
 *                 example: "Oliy Ta'lim Markazi"
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Markaz uchun rasm (foto).
 *               regionId:
 *                 type: integer
 *                 description: Markaz joylashgan hududning ID raqami.
 *                 example: 1
 *               address:
 *                 type: string
 *                 description: Markaz manzili.
 *                 example: "Toshkent, Yunusobod"
 *               majors:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Markazga tegishli bo'lgan o'quv yo'nalishlarining identifikatorlari. 
 *                 example: [1, 3, 4]
 *     responses:
 *       201:
 *         description: Markaz muvaffaqiyatli yaratildi
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
 *                 regionId:
 *                   type: integer
 *                 address:
 *                   type: string
 *                 majors:
 *                   type: array
 *                   items:
 *                     type: integer
 *       400:
 *         description: Yuborilgan ma'lumotlar noto'g'ri yoki yetarli emas.
 *       401:
 *         description: Foydalanuvchi autentifikatsiya qilinmagan.
 *       403:
 *         description: Foydalanuvchida kerakli ruxsatlar yo'q.
 *       500:
 *         description: Ichki server xatosi
 */


/**
 * @swagger
 * /center/{id}:
 *   patch:
 *     summary: Markazni yangilash
 *     description: Ushbu so'rovda markaz ma'lumotlari yangilanadi. Foydalanuvchi 'CEO' roliga ega bo'lishi kerak. Agar yangi qiymat berilmasa, eski qiymat qoldiriladi. Ma'lumotlar `form-data` orqali yuboriladi, shu jumladan rasm (foto).
 *     operationId: updateCenter
 *     tags:
 *       - Center
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanadigan markazning ID raqami.
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
 *                 description: Markaz nomi.
 *                 example: "Oliy Ta'lim Markazi"
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Markaz uchun rasm (foto).
 *               regionId:
 *                 type: integer
 *                 description: Markaz joylashgan hududning ID raqami.
 *                 example: 1
 *               address:
 *                 type: string
 *                 description: Markaz manzili.
 *                 example: "Toshkent, Yunusobod"
 *               majors:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Markazga tegishli bo'lgan o'quv yo'nalishlarining identifikatorlari.
 *                 example: [1, 3, 4]
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
 *                 name:
 *                   type: string
 *                 photo:
 *                   type: string
 *                 regionId:
 *                   type: integer
 *                 address:
 *                   type: string
 *                 majors:
 *                   type: array
 *                   items:
 *                     type: integer
 *       400:
 *         description: Yuborilgan ma'lumotlar noto'g'ri yoki yetarli emas.
 *       401:
 *         description: Foydalanuvchi autentifikatsiya qilinmagan.
 *       403:
 *         description: Foydalanuvchida kerakli ruxsatlar yo'q.
 *       404:
 *         description: Markaz topilmadi.
 *       500:
 *         description: Ichki server xatosi
 */


/**
 * @swagger
 * /center/{id}:
 *   delete:
 *     summary: Markazni o'chirish
 *     description: Ushbu so'rovda markaz o'chiriladi. Foydalanuvchi 'CEO' roliga ega bo'lishi kerak. ID raqami orqali markazni topib o'chirish amalga oshiriladi.
 *     operationId: deleteCenter
 *     tags:
 *       - Center
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan markazning ID raqami.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Markaz muvaffaqiyatli o'chirildi.
 *       400:
 *         description: Noto'g'ri ID raqami yoki so'rov ma'lumotlari.
 *       401:
 *         description: Foydalanuvchi autentifikatsiya qilinmagan.
 *       403:
 *         description: Foydalanuvchida kerakli ruxsatlar yo'q.
 *       404:
 *         description: Markaz topilmadi.
 *       500:
 *         description: Ichki server xatosi
 */
