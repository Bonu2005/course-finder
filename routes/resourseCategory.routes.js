import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/resourseCategory.controller.js";
import upload from "../multer/ResourseMulter.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";

const resourseCategoryRouter = Router()


resourseCategoryRouter.get("/", verifyToken,findAll);


resourseCategoryRouter.get("/:id",verifyToken, findOne);


resourseCategoryRouter.post("/",verifyToken,verifyRole(['ADMIN']), upload.single("photo"), create);

resourseCategoryRouter.patch("/:id",verifyToken,verifyRole(['ADMIN']), upload.single("photo"), update);


resourseCategoryRouter.delete("/:id",verifyToken,verifyRole(['ADMIN']), remove);


export default resourseCategoryRouter

/**
 * @swagger
 * tags:
 *   - name: ResourseCategory
 *     description: "ResourseCategory bilan bog'liq barcha amallar"
 */
/**
 * @swagger
 * /resourseCategory:
 *   get:
 *     summary: Get all resource categories
 *     description: This endpoint returns a list of resource categories with optional pagination, sorting, and filtering.
 *     tags:
 *       - ResourseCategory
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
 *         description: Filter parameters (e.g., by name, status, etc.)
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: Successfully retrieved resource categories
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
 *                   description:
 *                     type: string
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */


//---------------------------------------------------------------------------


/**
 * @swagger
 * /resourseCategory/{id}:
 *   get:
 *     summary: Berilgan ID bo'yicha resurs kategoriyasini olish
 *     description: Ushbu endpoint resurs kategoriyasini ID orqali olish uchun ishlatiladi.
 *     tags:
 *       -  ResourseCategory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Resurs kategoriyasining unikal identifikatori (ID).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resurs kategoriyasi muvaffaqiyatli qaytarildi
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
 *         description: Noto'g'ri so'rov yoki parameterlar
 *       404:
 *         description: Resurs kategoriyasi topilmadi
 *       500:
 *         description: Ichki server xatosi
 */

//--------------------------------------------------

/**
 * @swagger
 * /resourseCategory:
 *   post:
 *     summary: "Yangi resurs kategoriyasini yaratish"
 *     description: "Yangi resurs kategoriyasini yaratish uchun so'rov. Foydalanuvchi 'ADMIN' roli bo'lishi kerak. Ma'lumotlar 'form-data' orqali yuboriladi."
 *     operationId: createResourseCategory
 *     tags:
 *       - ResourseCategory
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
 *                 description: "Resurs kategoriyasi nomi."
 *                 example: "TEXNOLOGIYA"
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: "Resurs kategoriyasi uchun rasm (foto)."
 *               type:
 *                 type: string
 *                 description: "Resurs kategoriyasi turi (masalan, 'teoretik' yoki 'amaliy')."
 *                 example: "teoretik"
 *     responses:
 *       201:
 *         description: "Resurs kategoriyasi muvaffaqiyatli yaratildi."
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
 *       400:
 *         description: "Noto'g'ri ma'lumotlar yoki parametrlar."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       500:
 *         description: "Ichki server xatosi"
 */

//---------------------------------------------------------------


/**
 * @swagger
 * /resourseCategory/{id}:
 *   patch:
 *     summary: "Resurs kategoriyasini yangilash"
 *     description: "Resurs kategoriyasini yangilash uchun so'rov. Yangi ma'lumotlar faqat o'zgargan maydonlar bilan yangilanadi. Agar yangi ma'lumotlar bo'lmasa, eski qiymatlar saqlanadi."
 *     operationId: updateResourseCategory
 *     tags:
 *       - ResourseCategory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: "Resurs kategoriyasi ID-si"
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
 *                 description: "Resurs kategoriyasi nomi."
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: "Resurs kategoriyasi uchun rasm (foto)."
 *               type:
 *                 type: string
 *                 description: "Resurs kategoriyasi turi (masalan, 'teoretik', 'amaliy')."
 *     responses:
 *       200:
 *         description: "Resurs kategoriyasi muvaffaqiyatli yangilandi."
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
 *       400:
 *         description: "Noto'g'ri ma'lumotlar yoki parametrlar."
 *       404:
 *         description: "Resurs kategoriyasi topilmadi."
 *       500:
 *         description: "Ichki server xatosi"
 */


//-------------------------------------------------------------------

/**
 * @swagger
 * /resourseCategory/{id}:
 *   delete:
 *     summary: "Resurs kategoriyasini o'chirish"
 *     description: "Resurs kategoriyasini ID orqali o'chirish. Foydalanuvchi 'ADMIN' roliga ega bo'lishi kerak. O'chirilgan resurs haqida ma'lumot qaytariladi."
 *     operationId: deleteResourseCategory
 *     tags:
 *       - ResourseCategory
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
 *         description: "Resurs kategoriyasi muvaffaqiyatli o'chirildi."
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
 *       400:
 *         description: "Noto'g'ri parametrlar."
 *       404:
 *         description: "Resurs kategoriyasi topilmadi."
 *       500:
 *         description: "Ichki server xatosi"
 */