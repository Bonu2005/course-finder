import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/resourse.controller.js";
import upload from "../multer/ResourseMulter.js";
import verifyType from "../middlewares/verifyType.js";
import verifyToken from "../middlewares/verifyToken.js";

const resourseRouter = Router()


resourseRouter.get("/",verifyToken, findAll);

resourseRouter.get("/:id",verifyToken ,findOne);

resourseRouter.post("/",verifyToken, upload.single("photo"), create);

resourseRouter.patch("/:id",verifyToken, upload.single("photo"), update);

resourseRouter.delete("/:id",verifyToken, remove);
export default resourseRouter


/**
 * @swagger
 * tags:
 *   - name: Resourse
 *     description: Resourse bilan bog'liq barcha amallar
 */

/**
 * @swagger
 * /resourse:
 *   get:
 *     summary: Get all resources
 *     description: This endpoint returns a list of resources with optional pagination, sorting, and filtering.
 *     tags:
 *       - Resourse
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number to retrieve. Default is 1.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         required: false
 *         description: The number of items per page. Default is 10.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortBy
 *         required: false
 *         description: The field to sort by.
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         description: The order of sorting. Default is 'ASC'. (e.g., 'ASC' or 'DESC')
 *         schema:
 *           type: string
 *       - in: query
 *         name: filter
 *         required: false
 *         description: Filter parameters (e.g., by name, category, etc.)
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: Successfully retrieved resources
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
 *                   category:
 *                     type: string
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */

//--------------------------------------------------------------------

/**
 * @swagger
 * /resourse/{id}:
 *   get:
 *     summary: "Resurs kategoriyasini ID orqali olish"
 *     description: "Resurs kategoriyasini ID orqali olish. Foydalanuvchi autentifikatsiya qilinishi kerak."
 *     operationId: getResourseCategory
 *     tags:
 *       - Resourse
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "Resurs kategoriyasining ID-si"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Resurs kategoriyasi muvaffaqiyatli topildi."
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
 *                 type:
 *                   type: string
 *       404:
 *         description: "Resurs kategoriyasi topilmadi."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       500:
 *         description: "Ichki server xatosi"
 */


//-----------------------------------------------------


/**
 * @swagger
 * /resourse:
 *   post:
 *     summary: "Yangi resurs yaratish"
 *     description: "Bu so'rovda yangi resurs yaratiladi. Foydalanuvchi autentifikatsiya qilinishi kerak. Ma'lumotlar `form-data` orqali yuboriladi, jumladan rasm (foto)."
 *     operationId: createResourse
 *     tags:
 *       - Resourse
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
 *                 description: "Resursning nomi."
 *                 example: "Matematika kitobi"
 *               media:
 *                 type: string
 *                 description: "Resurs uchun media fayli."
 *               description:
 *                 type: string
 *                 description: "Resurs tavsifi."
 *                 example: "Bu matematika kitobi"
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: "Resurs uchun rasm (foto)."
 *               resourseCategoryId:
 *                 type: number
 *                 format: binary
 *                 description: "resourseCategorini aydisi."
 *     responses:
 *       201:
 *         description: "Resurs muvaffaqiyatli yaratildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 media:
 *                   type: string
 *                 description:
 *                   type: string
 *                 photo:
 *                   type: string
 *                 resourseCategoryId:
 *                   type: integer
 *       400:
 *         description: "Yuborilgan ma'lumotlar noto'g'ri yoki yetarli emas."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       500:
 *         description: "Ichki server xatosi"
 *
 */

//--------------------------------------------------------

/**
 * @swagger
 * /resourse/{id}:
 *   patch:
 *     summary: "Resursni yangilash"
 *     description: "Bu so'rovda mavjud resursni yangilash mumkin. Foydalanuvchi autentifikatsiya qilinishi kerak. Ma'lumotlar `form-data` orqali yuboriladi, jumladan rasm (foto)."
 *     operationId: updateResourse
 *     tags:
 *       - Resourse
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "Yangilanadigan resursning identifikatori."
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
 *                 description: "Resursning nomi."
 *               media:
 *                 type: string
 *                 description: "Resurs uchun media fayli."
 *               description:
 *                 type: string
 *                 description: "Resurs tavsifi."
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: "Resurs uchun rasm (foto)."
 *     responses:
 *       200:
 *         description: "Resurs muvaffaqiyatli yangilandi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 media:
 *                   type: string
 *                 description:
 *                   type: string
 *                 photo:
 *                   type: string
 *       400:
 *         description: "Yuborilgan ma'lumotlar noto'g'ri yoki yetarli emas."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       404:
 *         description: "Resurs topilmadi."
 *       500:
 *         description: "Ichki server xatosi"
 */


//--------------------------------------------------------------

/**
 * @swagger
 * /resourse/{id}:
 *   delete:
 *     summary: "Resursni o'chirish"
 *     description: "Bu so'rovda resursni o'chirish mumkin. Foydalanuvchi autentifikatsiya qilinishi kerak. Resursni o'chirish faqatgina tegishli ruxsatga ega bo'lgan foydalanuvchilar tomonidan amalga oshirilishi mumkin."
 *     operationId: deleteResourse
 *     tags:
 *       - Resourse
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "O'chiriladigan resursning identifikatori."
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Resurs muvaffaqiyatli o'chirildi."
 *       400:
 *         description: "Yuborilgan ma'lumotlar noto'g'ri yoki yetarli emas."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       404:
 *         description: "Resurs topilmadi."
 *       500:
 *         description: "Ichki server xatosi"
 */