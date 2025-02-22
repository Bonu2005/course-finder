import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/region.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";
const regionRouter = Router()

regionRouter.get("/", findAll);

regionRouter.get("/:id", findOne);

regionRouter.post("/",verifyRole(['ADMIN']),create);

regionRouter.patch("/:id",verifyRole(['ADMIN']), update);

regionRouter.delete("/:id",verifyRole(['ADMIN']), remove);    
export default regionRouter

/**
 * @swagger
 * tags:
 *   - name: Region
 *     description: "Region bilan bog'liq barcha amallar"
 */

/**
 * @swagger
 * /region:
 *   get:
 *     summary: "Barcha mintaqalarni olish"
 *     description: "Bu so'rovda barcha mintaqalar ro'yxati qaytariladi. Paginatsiya, saralash va filtrlar qo'llanilishi mumkin."
 *     operationId: getAllRegions
 *     tags:
 *       - Region
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
 *         description: "Saralash uchun maydon."
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         description: "Saralash tartibi. Default: 'ASC'. (masalan, 'ASC' yoki 'DESC')"
 *         schema:
 *           type: string
 *       - in: query
 *         name: filter
 *         required: false
 *         description: "Filtr parametrlarini qo'llash."
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: "Mintaqalar muvaffaqiyatli qaytarildi"
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
 * /region/{id}:
 *   get:
 *     summary: "Bir mintaqani olish"
 *     description: "Bu so'rovda mintaqa ID bo'yicha ma'lumot qaytariladi."
 *     operationId: getRegionById
 *     tags:
 *       - Region
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "Mintaqaning ID-si"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Mintaqa muvaffaqiyatli qaytarildi"
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
 *         description: "Mintaqa topilmadi"
 *       500:
 *         description: "Ichki server xatosi"
 */


/**
 * @swagger
 * /region:
 *   post:
 *     summary: "Yangi mintaqa yaratish"
 *     description: "Bu so'rovda yangi mintaqa yaratiladi. Foydalanuvchi 'ADMIN' roliga ega bo'lishi kerak."
 *     operationId: createRegion
 *     tags:
 *       - Region
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Mintaqaning nomi."
 *                 example: "Toshkent"
 *     responses:
 *       201:
 *         description: "Mintaqa muvaffaqiyatli yaratildi"
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
 * /region/{id}:
 *   patch:
 *     summary: "Mintaqani yangilash"
 *     description: "Bu so'rovda mintaqa ID bo'yicha ma'lumot yangilanadi. Foydalanuvchi 'ADMIN' roliga ega bo'lishi kerak. Agar ba'zi maydonlar yangilanmasa, ularning eski qiymatlari saqlanadi."
 *     operationId: updateRegion
 *     tags:
 *       - Region
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "Yangilanishi kerak bo'lgan mintaqaning ID-si."
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Yangilangan mintaqaning nomi."
 *                 example: "Samarqand"
 *     responses:
 *       200:
 *         description: "Mintaqa muvaffaqiyatli yangilandi"
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
 *         description: "Yuborilgan ma'lumotlar noto'g'ri yoki yetarli emas."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       404:
 *         description: "Mintaqa topilmadi."
 *       500:
 *         description: "Ichki server xatosi"
 */


/**
 * @swagger
 * /region/{id}:
 *   delete:
 *     summary: "Mintaqani o'chirish"
 *     description: "Bu so'rovda mintaqa ID bo'yicha ma'lumot o'chiriladi. Foydalanuvchi 'ADMIN' roliga ega bo'lishi kerak."
 *     operationId: deleteRegion
 *     tags:
 *       - Region
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "O'chirilishi kerak bo'lgan mintaqaning ID-si."
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Mintaqa muvaffaqiyatli o'chirildi"
 *       400:
 *         description: "ID noto'g'ri yoki noaniq."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       404:
 *         description: "Mintaqa topilmadi."
 *       500:
 *         description: "Ichki server xatosi"
 */
