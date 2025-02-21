import {send_otp, verify_otp, register, login, findAll, findOne, createAdmin, update, remove, send_update_otp, logout} from "../controllers/user.controller.js";
import upload from "../multer/UsersMulter.js";
import {Router} from 'express';
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifySelf from "../middlewares/verifySelf.js";
import refreshTokens from "../middlewares/refreshToken.js";
let userRouter = Router();
/**
 * @swagger
 * /send-otp:
 *   post:
 *     summary: OTP yuborish
 *     tags: [User]
 *     description: Foydalanuvchiga OTP yuborish uchun email manzili kerak.
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         type: string
 *         description: Foydalanuvchining email manzili, OTP yuborilishi kerak
 *     responses:
 *       200:
 *         description: OTP muvaffaqiyatli yuborildi
 */
userRouter.post("/send-otp", send_otp);

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     summary: OTP tasdiqlash
 *     tags: [User]
 *     description: Foydalanuvchining email manzili va OTP to'g'ri ekanligini tekshirish.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Foydalanuvchining email manzili
 *                 example: user@example.com
 *               otp1:
 *                 type: string
 *                 description: Foydalanuvchi tomonidan yuborilgan OTP
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP muvaffaqiyatli tasdiqlandi
 *       400:
 *         description: Noto'g'ri OTP yoki email
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
userRouter.post("/verify-otp", verify_otp);
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Foydalanuvchi ro'yxatdan o'tkazish
 *     tags: [User]
 *     description: Foydalanuvchini ro'yxatdan o'tkazish uchun barcha kerakli ma'lumotlarni yuboring.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: fullName
 *         type: string
 *         required: true
 *         description: Foydalanuvchining to'liq ismi
 *         example: "John Doe"
 *       - in: formData
 *         name: image
 *         type: file
 *         required: false
 *         description: Foydalanuvchining rasmi (ixtiyoriy)
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: Foydalanuvchining email manzili
 *         example: "user@example.com"
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: Foydalanuvchining paroli
 *         example: "supersecretpassword"
 *       - in: formData
 *         name: phone
 *         type: string
 *         required: true
 *         description: Foydalanuvchining telefon raqami
 *         example: "+998901234567"
 *       - in: formData
 *         name: type
 *         type: string
 *         required: true
 *         description: Foydalanuvchi turi
 *         enum: ["ceo", "student", "notype"]
 *         example: "student"
 *       - in: formData
 *         name: role
 *         type: string
 *         required: true
 *         description: Foydalanuvchi ro'li
 *         enum: ["admin", "user"]
 *         example: "user"
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *       400:
 *         description: Noto'g'ri yoki yetarlicha ma'lumotlar
 *       500:
 *         description: Server xatosi
 */
userRouter.post("/register", upload.single("image"), register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Foydalanuvchi tizimga kirish
 *     description: Foydalanuvchi tizimga kirishi uchun email va parolni yuboring.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *                 description: Foydalanuvchining tizimga kirishi uchun email manzili
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 required: true
 *                 description: Foydalanuvchining tizimga kirishi uchun parol
 *                 example: "supersecretpassword"
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli tizimga kirdi
 *       400:
 *         description: Noto'g'ri email yoki parol
 *       500:
 *         description: Server xatosi
 */
userRouter.post("/login", login);
/**
 * @swagger
 * /:
 *   get:
 *     summary: Barcha foydalanuvchilarni ko'rish
 *     description: Foydalanuvchilar ro'yxatini olish.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Barcha foydalanuvchilar muvaffaqiyatli olingan
 *       401:
 *         description: Avtorizatsiya muvaffaqiyatsiz
 *       500:
 *         description: Server xatosi
 */
userRouter.get("/", verifyToken, findAll);
/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Foydalanuvchining ma'lumotlarini olish
 *     description: Foydalanuvchining ma'lumotlarini ID orqali olish.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Foydalanuvchining IDsi
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli topildi
 *       401:
 *         description: Avtorizatsiya muvaffaqiyatsiz
 *       403:
 *         description: Sizda bu amalni bajarish huquqi yo'q
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
userRouter.get("/:id", verifyToken,verifyRole(["user"]), findOne);
/**
 * @swagger
 * /:
 *   post:
 *     summary: Yangi adminlarni yaratish
 *     description: Yangi adminlarni yaratish uchun kerakli ma'lumotlarni yuboring (image - rasm fayl).
 *     tags:
 *       - User
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: fullName
 *         type: string
 *         required: true
 *         description: adminni to'liq ismi
 *         example: "John Doe"
 *       - in: formData
 *         name: image
 *         type: file
 *         required: false
 *         description: adminni rasmi (ixtiyoriy)
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: adminni email manzili
 *         example: "user@example.com"
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: adminni paroli
 *         example: "supersecretpassword"
 *       - in: formData
 *         name: phone
 *         type: string
 *         required: true
 *         description: adminni telefon raqami
 *         example: "+998901234567"
 *       - in: formData
 *         name: type
 *         type: string
 *         required: true
 *         description: adminni turi
 *         enum: ["ceo", "student", "notype"]
 *         example: "student"
 *       - in: formData
 *         name: role
 *         type: string
 *         required: true
 *         description: adminni ro'li
 *         enum: ["admin", "user"]
 *         example: "user"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: admin muvaffaqiyatli yaratildi
 *       400:
 *         description: Noto'g'ri yoki yetarlicha ma'lumotlar
 *       500:
 *         description: Server xatosi
 */
userRouter.post("/", verifyToken, verifyRole(["user"]), upload.single("image"), create);
/**
 * @swagger
 * /send-update-otp/{id}:
 *   get:
 *     summary: OTP yuborish uchun so'rov
 *     description: Foydalanuvchiga email orqali OTP (one-time password) yuboradi, ID orqali foydalanuvchini aniqlaydi.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Foydalanuvchining IDsi (yuboriladigan OTP uchun)
 *         type: string
 *       - in: body
 *         name: email
 *         required: true
 *         description: Foydalanuvchining email manzili, OTP yuborish uchun
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "user@example.com"
 *               description: "Foydalanuvchining email manzili"
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: OTP muvaffaqiyatli yuborildi
 *       400:
 *         description:Xato so'rov, email noto'g'ri yoki yo'q
 *       401:
 *         description: Avtorizatsiya muvaffaqiyatsiz
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */

userRouter.get("/send-update-otp/:id", verifyToken, verifySelf(["user"]), send_update_otp);
/**
 * @swagger
 * /{otp2}/{oldemail}:
 *   patch:
 *     summary: Foydalanuvchining emailini yangilash
 *     description: Foydalanuvchining email manzilini yangilash va yangi rasmni yuklash.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: otp2
 *         required: true
 *         description: Foydalanuvchining OTPsi
 *         type: string
 *       - in: path
 *         name: oldemail
 *         required: true
 *         description: Foydalanuvchining eski email manzili
 *         type: string
 *       - in: formData
 *         name: image
 *         type: file
 *         required: false
 *         description: Foydalanuvchining yangi rasmi (ixtiyoriy)
 *       - in: formData
 *         name: newEmail
 *         type: string
 *         required: true
 *         description: Foydalanuvchining yangi email manzili
 *         example: "newemail@example.com"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchining emaili va rasmi muvaffaqiyatli yangilandi
 *       400:
 *         description: Noto'g'ri yoki yetarlicha ma'lumotlar
 *       401:
 *         description: Avtorizatsiya muvaffaqiyatsiz
 *       403:
 *         description: Sizda bu amalni bajarish huquqi yo'q
 *       404:
 *         description: Foydalanuvchi topilmadi yoki OTP noto'g'ri
 *       500:
 *         description: Server xatosi
 */

userRouter.patch("/:otp2/:oldemail", verifyToken, verifyRole(["user"]), upload.single("image"), update);
/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Foydalanuvchini o'chirish
 *     description: Foydalanuvchining IDsi asosida ularni o'chirish.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan foydalanuvchining IDsi
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o'chirildi
 *       401:
 *         description: Avtorizatsiya muvaffaqiyatsiz
 *       403:
 *         description: Sizda bu amalni bajarish huquqi yo'q
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
userRouter.delete("/:id", verifyToken, verifyRole(["user"]), remove);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Foydalanuvchini tizimdan chiqish
 *     description: Foydalanuvchi tizimdan chiqadi va cookie-dan autentifikatsiya tokenini o'chiradi.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli chiqish
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Muvaffaqiyatli chiqish amalga oshdi"
 *       401:
 *         description: Avtorizatsiya muvaffaqiyatsiz
 *       500:
 *         description: Server xatosi
 *     headers:
 *       Set-Cookie:
 *         description: Autentifikatsiya tokenini o'chirish uchun cookie yangilanadi.
 *         schema:
 *           type: string
 *           example: "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict;"
 */

userRouter.post("/logout", verifyToken, logout);

export default userRouter;
