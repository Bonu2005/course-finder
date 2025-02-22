import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/center.controller.js";
import upload from "../multer/CentersMulter.js"
import verifyToken from "../middlewares/verifyToken.js";
import verifyRole from "../middlewares/verifyRole.js";
import verifyType from "../middlewares/verifyType.js";

const centerRouter = Router()
/**
 * @swagger
 * /center:
 *   get:
 *     summary: "Barcha markazlarni olish"
 *     description: "Markazlarni filtrlash, saralash va sahifalash orqali olish."
 *     tags:
 *       - Center
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: "Sahifa raqami (default: 1)"
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: "Har bir sahifadagi elementlar soni (default: 10)"
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *         description: "Saralash uchun maydon (masalan: name, createdAt)"
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: "ASC"
 *         description: "Saralash tartibi (ASC yoki DESC)"
 *       - in: query
 *         name: regionId
 *         required: false
 *         schema:
 *           type: string
 *         description: "Region ID bo'yicha filtrlash"
 *       - in: query
 *         name: userId
 *         required: false
 *         schema:
 *           type: string
 *         description: "Foydalanuvchi ID bo'yicha filtrlash"
 *       - in: query
 *         name: address
 *         required: false
 *         schema:
 *           type: string
 *         description: "Markaz manzili bo'yicha filtrlash"
 *     responses:
 *       200:
 *         description: "Markazlar muvaffaqiyatli qaytarildi"
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
 *                       photo:
 *                         type: string
 *                       regionId:
 *                         type: integer
 *                       userId:
 *                         type: integer
 *                       address:
 *                         type: string
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       400:
 *         description: "Yomon so'rov"
 *       500:
 *         description: "Server xatosi"
 */

centerRouter.get("/",verifyToken,verifyType(['admin','ceo']), findAll);
/**
 * @swagger
 * /center/{id}:
 *   get:
 *     summary: "Markaz haqida batafsil ma'lumot olish"
 *     description: "Markazga tegishli ma'lumotlarni, shuningdek, uning filiallari, likelari, o'rtacha reytingi va ko'plab boshqa ma'lumotlarni olish."
 *     tags:
 *       - Center
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "Markazning ID raqami"
 *     responses:
 *       200:
 *         description: "Markaz va unga tegishli ma'lumotlar muvaffaqiyatli qaytarildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes_count:
 *                   type: integer
 *                   description: "Markazga tegishli likelar soni"
 *                 filials_count:
 *                   type: integer
 *                   description: "Markazga tegishli filiallar soni"
 *                 average_rating:
 *                   type: integer
 *                   description: "Markazning o'rtacha reytingi"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     photo:
 *                       type: string
 *                     address:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         fullName:
 *                           type: string
 *                         image:
 *                           type: string
 *                         type:
 *                           type: string
 *                     region:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                 majority:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       majorityId:
 *                         type: integer
 *                       majority:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                       subjects:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *                 likes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       userId:
 *                         type: integer
 *                       centerId:
 *                         type: integer
 *       404:
 *         description: "Markaz topilmadi"
 *       400:
 *         description: "Yomon so'rov"
 *       500:
 *         description: "Server xatosi"
 */

centerRouter.get("/:id",verifyToken,verifyType(['admin','ceo']), findOne);
/**
 * @swagger
 * /center:
 *   post:
 *     summary: "Yangi markaz yaratish"
 *     description: "Markazga rasm yuklash va markaz yozuvini yaratish uchun kerakli ma'lumotlarni yuboradi."
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
 *                 description: "Markaz nomi"
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: "Markaz rasmi"
 *               regionId:
 *                 type: integer
 *                 description: "Markazning joylashgan hududi (Region ID)"
 *               userId:
 *                 type: integer
 *                 description: "Markazga tegishli foydalanuvchi ID"
 *               address:
 *                 type: string
 *                 description: "Markaz manzili"
 *               majors:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: "Spetsialliklar IDlaridan iborat massiv (JSON formatida)"
 *     responses:
 *       200:
 *         description: "Markaz muvaffaqiyatli yaratildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     photo:
 *                       type: string
 *                     userId:
 *                       type: integer
 *                     regionId:
 *                       type: integer
 *                     address:
 *                       type: string
 *       400:
 *         description: "Ma'lumotlar noto'g'ri"
 *       404:
 *         description: "Rasm yuklanmagan yoki MajorId mavjud emas"
 *       500:
 *         description: "Server xatosi"
 */

centerRouter.post("/",verifyType(["ceo","admin"]),upload.single("photo"), create);

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
centerRouter.patch("/:id", verifyType(["ceo"]),upload.single("photo"), update);
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
centerRouter.delete("/:id",verifyType(["ceo"]) ,remove);

export default centerRouter