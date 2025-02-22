import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/filial.controller.js";
import upload from "../multer/CentersMulter.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyType from "../middlewares/verifyType.js"

const filialRouter = Router()




filialRouter.get("/", findAll)

filialRouter.get("/:id", verifyToken, verifyType(["CEO", "ADMIN"]), findOne)

filialRouter.post("/", verifyToken, verifyType(["CEO"]), upload.single("photo"), create);

filialRouter.patch("/:id", verifyToken, verifyType(["CEO"]), upload.single("photo"), update);

filialRouter.delete("/:id", verifyToken, verifyType(["CEO"]), remove)
export default filialRouter

/**
 * @swagger
 * tags:
 *   - name: Filial
 *     description: Filial bilan bog'liq barcha amallars
 */
/**
 * @swagger
 * /filial:
 *   get:
 *     summary: "Filiallar ro'yxatini olish"
 *     description: "Bu so'rov filiallar ro'yxatini qaytaradi. Paginatsiya, saralash va filtratsiya parametrlari qo'llab-quvvatlanadi."
 *     operationId: getFilials
 *     tags:
 *       - Filial
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
 *         description: "Filtr parametrlari (masalan, filial nomi, status va hokazo)."
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: "Filiallar ro'yxati muvaffaqiyatli qaytarildi."
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
 *                   location:
 *                     type: string
 *                   regionId:
 *                     type: integer
 *                   phone:
 *                     type: string
 *                   address:
 *                     type: string
 *                   photo:
 *                     type: string
 *       400:
 *         description: "Noto'g'ri so'rov parametrlaridan foydalanilgan."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       500:
 *         description: "Ichki server xatosi"
 */



//-----------------------------------------------------------------------------

/**
 * @swagger
 * /filial/{id}:
 *   get:
 *     summary: "Filiyal haqida ma'lumot olish"
 *     description: "Bu so'rovda berilgan IDga ega filiyal haqida ma'lumotlar qaytariladi. Foydalanuvchi 'CEO' yoki 'ADMIN' roli bilan autentifikatsiya qilinishi kerak."
 *     operationId: getFilial
 *     tags:
 *       - Filial
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "Olish kerak bo'lgan filiyalning ID."
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: "Filiyal haqida ma'lumot muvaffaqiyatli qaytarildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 contactNumber:
 *                   type: string
 *       400:
 *         description: "Filiyal topilmadi"
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan"
 *       403:
 *         description: "Foydalanuvchi faqat 'CEO' yoki 'ADMIN' roli bilan filiyal ma'lumotlarini ko'rishi mumkin"
 *       500:
 *         description: "Ichki server xatosi"
 */

/**
 * @swagger
 * /filial:
 *   post:
 *     summary: "Filial yaratish"
 *     description: "Yangi filial yaratish. Foydalanuvchi 'CEO' bo'lishi kerak. Ma'lumotlar `form-data` orqali yuboriladi, shu jumladan rasm (foto)."
 *     operationId: createFilial
 *     tags:
 *       - Filial
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 description: "Filial joylashuvi."
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: "Filial uchun rasm (foto)."
 *               regionId:
 *                 type: integer
 *                 description: "Filial joylashgan hudud (Region)."
 *               phone:
 *                 type: string
 *                 description: "Filial telefoni."
 *               address:
 *                 type: string
 *                 description: "Filial manzili."
 *               centerId:
 *                 type: integer
 *                 description: "Filial tegishli bo'lgan markaz (Center)."
 *     responses:
 *       201:
 *         description: "Filial muvaffaqiyatli yaratildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 location:
 *                   type: string
 *                 photo:
 *                   type: string
 *                 regionId:
 *                   type: integer
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *                 centerId:
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
 * /filial/{id}:
 *   patch:
 *     summary: "Filialni yangilash"
 *     description: "Filialni yangilash. Agar ma'lum bir parametr yuborilmagan bo'lsa, eski qiymat saqlanadi."
 *     operationId: updateFilial
 *     tags:
 *       - Filial
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "Yangilanishi kerak bo'lgan filialning ID raqami."
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 description: "Filial joylashuvi."
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: "Filial uchun rasm (foto)."
 *               regionId:
 *                 type: integer
 *                 description: "Filial joylashgan hudud (Region)."
 *               phone:
 *                 type: string
 *                 description: "Filial telefoni."
 *               address:
 *                 type: string
 *                 description: "Filial manzili."
 *               filialId:
 *                 type: integer
 *                 description: "Filial tegishli bo'lgan markaz (Center)."
 *     responses:
 *       200:
 *         description: "Filial muvaffaqiyatli yangilandi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 location:
 *                   type: string
 *                 photo:
 *                   type: string
 *                 regionId:
 *                   type: integer
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *                 centerId:
 *                   type: integer
 *       400:
 *         description: "Yuborilgan ma'lumotlar noto'g'ri yoki yetarli emas."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       404:
 *         description: "Filial topilmadi."
 *       500:
 *         description: "Ichki server xatosi."
 */

/**
 * @swagger
 * /filial/{id}:
 *   delete:
 *     summary: "Filialni o'chirish"
 *     description: "Berilgan ID bo'yicha filialni o'chirish. Foydalanuvchi 'CEO' yoki 'ADMIN' roliga ega bo'lishi kerak."
 *     operationId: deleteFilial
 *     tags:
 *       - Filial
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "O'chirilishi kerak bo'lgan filialning ID raqami."
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Filial muvaffaqiyatli o'chirildi."
 *       400:
 *         description: "Yuborilgan ID noto'g'ri."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       404:
 *         description: "Filial topilmadi."
 *       500:
 *         description: "Ichki server xatosi."
 */
