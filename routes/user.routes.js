import {send_otp, verify_otp, register, login, findAll, findOne, createAdmin, update, remove, send_update_otp, logout} from "../controllers/user.controller.js";
import upload from "../multer/UsersMulter.js";
import {Router} from 'express';
import verifyRole from "../middlewares/verifyRole.js";
import verifyToken from "../middlewares/verifyToken.js";
// import verifySelf from "../middlewares/verifySelf.js";
import refreshTokens from "../middlewares/refreshToken.js";

let userRouter = Router();

userRouter.post("/send-otp", send_otp);
userRouter.post("/verify-otp", verify_otp);
userRouter.post("/register", upload.single("image"), register);
userRouter.post("/login", login);
userRouter.get("/", verifyToken, findAll);
userRouter.get("/:id", verifyToken,verifyRole(["ADMIN"]), findOne);
userRouter.post("/", verifyToken, verifyRole(["ADMIN"]), upload.single("image"), createAdmin);
userRouter.post("/send-update-otp/:id",  send_update_otp)
userRouter.patch("/:otp2/:oldemail", upload.single("image"), update);
userRouter.delete("/:id", verifyToken, verifyRole(["ADMIN"]), remove);
userRouter.post("/:id", verifyToken, refreshTokens);
userRouter.post("/logout", verifyToken, logout);
// userRouter.patch("/updateself/:id", verifyToken, verifySelf(["ADMIN"]),upload.single("image"), updateself);

export default userRouter;


/**
 * @swagger
 * tags:
 *   - name: User
 *     description: "Foydalanuvchi bilan bog'liq barcha amallar"
 */

/**
 * @swagger
 * /user/send-otp:
 *   post:
 *     summary: "OTP yuborish"
 *     description: "Berilgan email manziliga bir martalik parol (OTP) yuboriladi."
 *     operationId: sendOtp
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
 *                 format: email
 *                 description: "OTP yuboriladigan email manzili."
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: "OTP muvaffaqiyatli yuborildi."
 *       400:
 *         description: "Noto'g'ri so'rov (masalan, email noto'g'ri yoki ko'rsatilmagan)."
 *       500:
 *         description: "Ichki server xatosi."
 */

//----------------------------------------------

/**
 * @swagger
 * /user/verify-otp:
 *   post:
 *     summary: "OTP tekshirish"
 *     description: "Berilgan email manzili va OTP bir martalik parolni tekshiradi."
 *     operationId: verifyOtp
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
 *                 format: email
 *                 description: "OTP tekshiriladigan email manzili."
 *               otp1:
 *                 type: string
 *                 description: "Foydalanuvchi tomonidan kiritilgan OTP."
 *             required:
 *               - email
 *               - otp1
 *     responses:
 *       200:
 *         description: "OTP muvaffaqiyatli tasdiqlandi."
 *       400:
 *         description: "Noto'g'ri OTP yoki email."
 *       500:
 *         description: "Ichki server xatosi."
 */



//----------------------------------------------

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: "Foydalanuvchi ro'yxatdan o'tishi"
 *     description: "Foydalanuvchi tizimga ro'yxatdan o'tishi uchun barcha kerakli ma'lumotlarni yuboradi. Ro'yxatdan o'tishda tasvir (image) ham yuboriladi."
 *     operationId: register
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: "Foydalanuvchining to'liq ismi."
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: "Foydalanuvchining tasviri (jpg, png va boshqalar)."
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "Foydalanuvchining email manzili."
 *               password:
 *                 type: string
 *                 description: "Foydalanuvchining paroli."
 *               phone:
 *                 type: string
 *                 description: "Foydalanuvchining telefon raqami."
 *               type:
 *                 type: string
 *                 enum:
 *                   - CEO
 *                   - STUDENT
 *                   - NOTYPE
 *                 description: "Foydalanuvchi turi."
 *               role:
 *                 type: string
 *                 enum:
 *                   - ADMIN
 *                   - USER
 *                 default: "USER"
 *                 description: "Foydalanuvchi ro'li."
 *     responses:
 *       200:
 *         description: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi."
 *       400:
 *         description: "Noto'g'ri ma'lumot yoki formaning yomon formatda bo'lishi."
 *       500:
 *         description: "Ichki server xatosi."
 */

//----------------------------------------------

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: "Foydalanuvchi tizimga kirishi"
 *     description: "Foydalanuvchi tizimga kirish uchun email va parol yuboradi."
 *     operationId: login
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
 *                 format: email
 *                 description: "Foydalanuvchining email manzili."
 *               password:
 *                 type: string
 *                 description: "Foydalanuvchining paroli."
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: "Foydalanuvchi muvaffaqiyatli tizimga kirdi."
 *       400:
 *         description: "Noto'g'ri email yoki parol."
 *       500:
 *         description: "Ichki server xatosi."
 */

//------------------------------------------

/**
 * @swagger
 * /user:       
 *   get:
 *     summary: "Foydalanuvchilar ro'yxatini olish"
 *     description: "Foydalanuvchilar ro'yxatini olish, filtr, sahifalash va tartiblash imkoniyatlari bilan."
 *     operationId: findAllUsers
 *     tags:
 *       - User
 *     parameters:
 *       - name: page
 *         in: query
 *         description: "Sahifa raqami (default: 1)"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         description: "Sahifadagi elementlar soni (default: 10)"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sortBy
 *         in: query
 *         description: "Qaysi maydonga ko'ra tartiblash (masalan: 'fullName', 'email')"
 *         required: false
 *         schema:
 *           type: string
 *       - name: sortOrder
 *         in: query
 *         description: "Tartiblash tartibi ('ASC' yoki 'DESC', default: 'ASC')"
 *         required: false
 *         schema:
 *           type: string
 *           default: "ASC"
 *       - name: filter
 *         in: query
 *         description: "Filtrlash parametrlarining o'ziga xos to'plami. Masalan: ?fullName=John&email=john@example.com"
 *         required: false
 *         schema:
 *           type: object
 *           additionalProperties:
 *             type: string
 *     responses:
 *       200:
 *         description: "Foydalanuvchilar ro'yxati muvaffaqiyatli olingan."
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
 *                       fullName:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       image:
 *                         type: string
 *                       type:
 *                         type: string
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       400:
 *         description: "Xato so'rov yoki filtrlar bilan ma'lumotlarni topib bo'lmadi."
 *       500:
 *         description: "Ichki server xatosi."
 */

//----------------------------------------------



/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: "Foydalanuvchini id bo'yicha olish"
 *     description: "Berilgan id bo'yicha foydalanuvchining ma'lumotlarini olish. Bu so'rov faqat 'ADMIN' roli bilan foydalanuvchilar uchun mavjud."
 *     operationId: findOneUser
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "Foydalanuvchining id raqami."
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Foydalanuvchi muvaffaqiyatli topildi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 image:
 *                   type: string
 *                 type:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: "Noto'g'ri id yoki foydalanuvchi topilmadi."
 *       401:
 *         description: "Tizimga kirish uchun autentifikatsiya kerak."
 *       403:
 *         description: "Ruxsat etilmagan operatsiya, faqat ADMIN roli bilan."
 *       500:
 *         description: "Ichki server xatosi."
 */

//-------------------------------------------------------

/**
 * @swagger
 * /user/:
 *   post:
 *     summary: "Admin tomonidan yangi foydalanuvchi yaratish"
 *     description: "Yangi foydalanuvchi yaratish uchun barcha kerakli ma'lumotlarni yuboradi. Foydalanuvchi 'ADMIN' roli bilan bo'lishi kerak."
 *     operationId: createAdmin
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: "Foydalanuvchining to'liq ismi."
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: "Foydalanuvchining tasviri (jpg, png va boshqalar)."
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "Foydalanuvchining email manzili."
 *               password:
 *                 type: string
 *                 description: "Foydalanuvchining paroli."
 *               phone:
 *                 type: string
 *                 description: "Foydalanuvchining telefon raqami."
 *               type:
 *                 type: string
 *                 enum:
 *                   - CEO
 *                   - STUDENT
 *                   - NOTYPE
 *                 description: "Foydalanuvchi turi."
 *               role:
 *                 type: string
 *                 enum:
 *                   - ADMIN
 *                   - USER
 *                 default: "USER"
 *                 description: "Foydalanuvchi ro'li."
 *     responses:
 *       200:
 *         description: "Foydalanuvchi muvaffaqiyatli yaratildi."
 *       400:
 *         description: "Noto'g'ri ma'lumotlar yoki formaning noto'g'ri formati."
 *       401:
 *         description: "Tizimga kirish uchun autentifikatsiya kerak."
 *       403:
 *         description: "Ruxsat etilmagan operatsiya, faqat 'ADMIN' roli bilan."
 *       500:
 *         description: "Ichki server xatosi."
 */

//-----------------------------------------------


/**
 * @swagger
 * /user/send-update-otp/{id}:
 *   post:
 *     summary: "OTP yuborish uchun foydalanuvchi emailini yangilash"
 *     description: "Foydalanuvchi emailini yangilash uchun OTP yuboriladi. Foydalanuvchi `id` orqali topiladi va yangi email yuboriladi."
 *     operationId: sendUpdateOtp
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "Foydalanuvchining id raqami."
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "Foydalanuvchining yangi email manzili."
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: "OTP muvaffaqiyatli yuborildi."
 *       400:
 *         description: "Email noto'g'ri yoki boshqa xato."
 *       404:
 *         description: "Foydalanuvchi topilmadi."
 *       500:
 *         description: "Ichki server xatosi."
 */

//--------------------------------------------

/**
 * @swagger
 * /user/{otp2}/{oldemail}:
 *   patch:
 *     summary: "Foydalanuvchi ma'lumotlarini yangilash"
 *     description: "Foydalanuvchi ma'lumotlarini yangilash uchun email va OTP2 orqali tasdiqlash. Bu so'rovda faqat ba'zi ma'lumotlarni (masalan, `fullName`, `phone`, `image`) yangilash mumkin. `role` va `email` o'zgarmaydi."
 *     operationId: updateUser
 *     tags:
 *       - User
 *     parameters:
 *       - name: otp2
 *         in: path
 *         description: "OTP2 tasdiqlovchi kod."
 *         required: true
 *         schema:
 *           type: string
 *       - name: oldemail
 *         in: path
 *         description: "Foydalanuvchining eski email manzili (bu emailni yangilash mumkin emas)."
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: "Foydalanuvchining to'liq ismi."
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: "Foydalanuvchining yangi tasviri (jpg, png va boshqalar)."
 *               phone:
 *                 type: string
 *                 description: "Foydalanuvchining telefon raqami."
 *               type:
 *                 type: string
 *                 enum:
 *                   - CEO
 *                   - STUDENT
 *                   - NOTYPE
 *                 description: "Foydalanuvchi turi."
 *     responses:
 *       200:
 *         description: "Foydalanuvchi ma'lumotlari muvaffaqiyatli yangilandi."
 *       400:
 *         description: "Noto'g'ri ma'lumotlar yoki formaning noto'g'ri formati."
 *       401:
 *         description: "Tizimga kirish uchun autentifikatsiya kerak."
 *       403:
 *         description: "Foydalanuvchi faqat o'z ma'lumotlarini yangilashi mumkin."
 *       404:
 *         description: "Foydalanuvchi topilmadi yoki eski email noto'g'ri."
 *       500:
 *         description: "Ichki server xatosi."
 */

//-----------------------------------------------


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: "Foydalanuvchini o'chirish"
 *     description: "Admin roli bilan foydalanuvchi `id` raqamiga asoslanib foydalanuvchini tizimdan o'chiradi."
 *     operationId: deleteUser
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "O'chiriladigan foydalanuvchining `id` raqami."
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Foydalanuvchi muvaffaqiyatli o'chirildi."
 *       400:
 *         description: "Noto'g'ri `id` yoki boshqa xato."
 *       401:
 *         description: "Tizimga kirish uchun autentifikatsiya kerak."
 *       403:
 *         description: "Foydalanuvchi faqat `ADMIN` roli bilan o'chirilishi mumkin."
 *       404:
 *         description: "Foydalanuvchi topilmadi."
 *       500:
 *         description: "Ichki server xatosi."
 */

//----------------------------------------------

/**
 * @swagger
 * /user/{id}:
 *   post:
 *     summary: "Foydalanuvchi uchun tokenlarni yangilash"
 *     description: "Foydalanuvchi uchun yangi tokenlarni olish. Bu so'rovni faqat autentifikatsiya qilingan foydalanuvchilar yuborishi mumkin."
 *     operationId: refreshTokens
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "Foydalanuvchining `id` raqami. Tokenlar shu foydalanuvchi uchun yangilanadi."
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Tokenlar muvaffaqiyatli yangilandi."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: "Yangi access token."
 *                 refreshToken:
 *                   type: string
 *                   description: "Yangi refresh token."
 *       400:
 *         description: "Noto'g'ri `id` yoki boshqa xato."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan."
 *       403:
 *         description: "Foydalanuvchi o'zining tokenlarini yangilashi kerak."
 *       404:
 *         description: "Foydalanuvchi topilmadi."
 *       500:
 *         description: "Ichki server xatosi."
 */

//----------------------------------------------------------------------

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: "Foydalanuvchini tizimdan chiqish"
 *     description: "Foydalanuvchi tizimdan chiqadi. Bu so'rovda mavjud bo'lgan autentifikatsiya cookie'lari (tokenlar) o'chiriladi."
 *     operationId: logout
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: "Foydalanuvchi muvaffaqiyatli tizimdan chiqdi va cookie'lar o'chirildi."
 *       401:
 *         description: "Foydalanuvchi autentifikatsiya qilinmagan yoki sessiya tugagan."
 *       500:
 *         description: "Ichki server xatosi."
 */
