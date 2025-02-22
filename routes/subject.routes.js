import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/subject.controller.js";
import upload from "../multer/SubjectMulter.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";

const subjectRouter = Router()

subjectRouter.get("/", findAll);

subjectRouter.get("/:id", findOne);

subjectRouter.post("/",verifyToken,verifyRole(['ADMIN']), upload.single("photo"), create);

subjectRouter.patch("/:id",verifyToken,verifyRole(['CEO','ADMIN']), upload.single("photo"), update);

subjectRouter.delete("/:id",verifyToken,verifyRole('ADMIN'), remove);

export default subjectRouter

/**
 * @swagger
 * tags:
 *   - name: Subject
 *     description: "Predmetlar bilan bog'liq barcha amallar"
 */

/**
 * @swagger
 * /subject:
 *   get:
 *     summary: "Predmetlar ro'yxatini olish"
 *     description: "Bu so'rov barcha predmetlar ro'yxatini olish uchun ishlatiladi. Filtrlash, sortlash va sahifalash imkoniyatlari mavjud."
 *     operationId: getSubjects
 *     tags:
 *       - Subject
 *     parameters:
 *       - name: page
 *         in: query
 *         description: "Ko'rsatilgan sahifa (defolt: 1)"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         description: "Sahifada ko'rsatiladigan elementlar soni (defolt: 10)"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sortBy
 *         in: query
 *         description: "Sarlavhaga asoslangan tartiblash (masalan: name)"
 *         required: false
 *         schema:
 *           type: string
 *       - name: sortOrder
 *         in: query
 *         description: "Tartiblash tartibi (ASC yoki DESC)"
 *         required: false
 *         schema:
 *           type: string
 *           default: "ASC"
 *       - name: filter
 *         in: query
 *         description: "Filtrlash uchun maydonlar. Har bir maydon uchun qiymatni kiritish mumkin (masalan: name=Matematika)."
 *         required: false
 *         schema:
 *           type: object
 *           additionalProperties:
 *             type: string
 *     responses:
 *       200:
 *         description: "Predmetlar muvaffaqiyatli ro'yxatga olindi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                 totalItems:
 *                   type: integer
 *                   description: "Jami elementlar soni."
 *                 totalPages:
 *                   type: integer
 *                   description: "Jami sahifalar soni."
 *                 currentPage:
 *                   type: integer
 *                   description: "Joriy sahifa raqami."
 *       400:
 *         description: "Xato so'rov"
 *       500:
 *         description: "Ichki server xatosi"
 */

//--------------------------------------------------------

/**
 * @swagger
 * /subject/{id}:
 *   get:
 *     summary: "Bitta predmet haqida ma'lumot olish"
 *     description: "Bu so'rovda `id` yordamida bitta predmet haqida ma'lumot olinadi."
 *     operationId: getSubjectById
 *     tags:
 *       - Subject
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "Predmetning `id` raqami. Ushbu id orqali ma'lumotlar olinadi."
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Predmet muvaffaqiyatli topildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: "Predmet topilmadi"
 *       500:
 *         description: "Ichki server xatosi"
 */

//------------------------------------------------------------------

/**
 * @swagger
 * /subject/:
 *   post:
 *     summary: "Yangi predmet yaratish"
 *     description: "Bu so'rovda yangi predmet yaratiladi. Foydalanuvchi 'ADMIN' roliga ega bo'lishi kerak. Ma'lumotlar `form-data` orqali yuboriladi, jumladan rasm (foto)."
 *     operationId: createSubject
 *     tags:
 *       - Subject
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
 *                 description: "Predmetning nomi."
 *                 example: "Matematika"
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: "Predmet uchun rasm (foto)."
 *               type:
 *                 type: string
 *                 description: "Predmet turi (masalan, 'teoretik', 'amaliy')."
 *                 example: "teoretik"
 *     responses:
 *       201:
 *         description: "Predmet muvaffaqiyatli yaratildi"
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
 *         description: "Yuborilgan ma'lumotlar noto'g'ri yoki yetarli emas."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       500:
 *         description: "Ichki server xatosi"
 */

//-------------------------------------------------------------


/**
 * @swagger
 * /subject/{id}:
 *   patch:
 *     summary: "Predmetni yangilash"
 *     description: "Bu so'rovda predmetning ma'lum maydonlarini yangilash mumkin. Foydalanuvchi 'CEO' yoki 'ADMIN' roliga ega bo'lishi kerak. Agar biron-bir maydonni yubormasangiz, u holda eski qiymat saqlanadi."
 *     operationId: updateSubject
 *     tags:
 *       - Subject
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "Yangilanishi kerak bo'lgan predmetning `id` raqami."
 *         required: true
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
 *                 description: "Predmetning yangi nomi."
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: "Predmetning yangi rasm (foto). Agar bu qiymat yuborilmasa, eski rasm saqlanadi."
 *               type:
 *                 type: string
 *                 description: "Predmet turi (masalan, 'teoretik', 'amaliy'). Agar bu qiymat yuborilmasa, eski qiymat saqlanadi."
 *     responses:
 *       200:
 *         description: "Predmet muvaffaqiyatli yangilandi"
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
 *         description: "Yuborilgan ma'lumotlar noto'g'ri yoki yetarli emas."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       404:
 *         description: "Predmet topilmadi."
 *       500:
 *         description: "Ichki server xatosi"
 */

//-----------------------------------------------------------------------


/**
 * @swagger
 * /subject/{id}:
 *   delete:
 *     summary: "Predmetni o'chirish"
 *     description: "Bu so'rovda predmetni ID bo'yicha o'chirish mumkin. Foydalanuvchi 'ADMIN' roliga ega bo'lishi kerak."
 *     operationId: deleteSubject
 *     tags:
 *       - Subject
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "O'chirilishi kerak bo'lgan predmetning `id` raqami."
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Predmet muvaffaqiyatli o'chirildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Predmet muvaffaqiyatli o'chirildi"
 *       400:
 *         description: "O'chirish uchun noto'g'ri ID."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       404:
 *         description: "Predmet topilmadi."
 *       500:
 *         description: "Ichki server xatosi"
 */


//----------------------------------------------
