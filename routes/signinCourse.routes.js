import { Router } from "express";
import { create, findAll, finish} from "../controllers/signinCourse.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyType from "../middlewares/verifyType.js";

const signinCourseRouter = Router()

signinCourseRouter.get("/",verifyToken,verifyType(['CEO','ADMIN']), findAll);

signinCourseRouter.post("/",verifyToken, create);

signinCourseRouter.patch("/:id",verifyToken,verifyRole(['ADMIN']), finish);
export default signinCourseRouter


/**
 * @swagger
 * tags:
 *   - name: SigninCourse
 *     description: "Signin Course bilan bog'liq barcha amallar"
 */

/**
 * @swagger
 * /signinCourse:
 *   get:
 *     summary: "Signin course ro'yxatini olish"
 *     description: "Bu so'rovda signin kurslarini olish mumkin. Foydalanuvchi 'CEO' yoki 'ADMIN' roliga ega bo'lishi kerak. Kurslar sahifa bo'yicha ko'rsatiladi va ularni turli mezonlarga ko'ra filtrlash mumkin."
 *     operationId: findAllSigninCourses
 *     tags:
 *       - SigninCourse
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: "Ko'rsatiladigan sahifa raqami."
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         description: "Har bir sahifada ko'rsatiladigan elementlar soni."
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sortBy
 *         in: query
 *         description: "Sutun bo'yicha saralash."
 *         required: false
 *         schema:
 *           type: string
 *       - name: sortOrder
 *         in: query
 *         description: "Saralash tartibi. 'ASC' (ko'tarilish tartibi) yoki 'DESC' (pasayish tartibi)."
 *         required: false
 *         schema:
 *           type: string
 *           default: "ASC"
 *       - name: filter
 *         in: query
 *         description: "Filtrlash uchun qo'shimcha parametrlar. Foydalanuvchi turli parametrlar bo'yicha kurslarni filtrlash imkoniga ega."
 *         required: false
 *         schema:
 *           type: object
 *           additionalProperties:
 *             type: string
 *     responses:
 *       200:
 *         description: "Kurslar ro'yxati muvaffaqiyatli qaytarildi."
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
 *                       startDate:
 *                         type: string
 *                         format: date
 *                       endDate:
 *                         type: string
 *                         format: date
 *                       type:
 *                         type: string
 *                       photo:
 *                         type: string
 *                 totalItems:
 *                   type: integer
 *                   description: "Jami kurslar soni."
 *                 totalPages:
 *                   type: integer
 *                   description: "Jami sahifalar soni."
 *                 currentPage:
 *                   type: integer
 *                   description: "Hozirgi sahifa raqami."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchida kerakli ruxsatlar yo'q."
 *       500:
 *         description: "Ichki server xatosi."
 */

//--------------------------------------------------

/**
 * @swagger
 * /signinCourse:
 *   post:
 *     summary: Yangi signin kursini yaratish
 *     description: Ushbu endpoint yangi signin kursini yaratadi, bunda `userId` autentifikatsiya tokenidan olinadi va majorityId, filialId va status talab qilinadi.
 *     tags:
 *       - SigninCourse
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               majorityId:
 *                 type: integer
 *                 description: Majority guruhining ID raqami.
 *               filialId:
 *                 type: integer
 *                 description: Filialning ID raqami.
 *               
 *             required:
 *               - majorityId
 *               - filialId
 *               
 *     responses:
 *       201:
 *         description: Yangi signin kursi muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Yaratilgan yangi signin kursining ID raqami.
 *                 majorityId:
 *                   type: integer
 *                   description: Majority guruhining ID raqami.
 *                 filialId:
 *                   type: integer
 *                   description: Filialning ID raqami.
 *                 status:
 *                   type: string
 *                   description: Kursning holati.
 *       400:
 *         description: Noto'g'ri ma'lumot kiritilgan, kerakli maydonlar yo'q
 *       401:
 *         description: Avtorizatsiya xatosi, token noto'g'ri yoki mavjud emas
 *       500:
 *         description: Ichki server xatosi
 */


//-------------------------------------------------------------------


/**
 * @swagger
 * /signinCourse/{id}:
 *   patch:
 *     summary: Signin kursining holatini yangilash
 *     description: Ushbu endpoint ma'lum bir signin kursining holatini ID bo'yicha yangilash uchun ishlatiladi. Faqatgina adminlar uchun mavjud.
 *     tags:
 *       - SigninCourse
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Yangilanishi kerak bo'lgan signin kursining ID raqami.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Kursning yangi holati (masalan, 'completed', 'active', 'inactive').
 *               majorityId:
 *                 type: integer
 *                 description: Majority guruhining ID raqami (ixtiyoriy, agar uni o'zgartirmoqchi bo'lsangiz).
 *               filialId:
 *                 type: integer
 *                 description: Filialning ID raqami (ixtiyoriy, agar uni o'zgartirmoqchi bo'lsangiz).
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Signin kursi muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Yangilangan signin kursining ID raqami.
 *                 status:
 *                   type: string
 *                   description: Yangilangan kursning holati.
 *       400:
 *         description: Noto'g'ri ma'lumot, kerakli yoki noto'g'ri parametrlar yo'q
 *       401:
 *         description: Avtorizatsiya xatosi, token noto'g'ri yoki mavjud emas
 *       403:
 *         description: Man etilgan, foydalanuvchida kerakli rol (ADMIN) yo'q
 *       404:
 *         description: Kurs topilmadi, belgilangan ID bilan
 *       500:
 *         description: Ichki server xatosi
 */


//-----------------------------------------------------------