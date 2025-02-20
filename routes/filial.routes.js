import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/filial.controller.js";
import upload from "../multer/multerMajority.js";

const filialRouter = Router()


/**
 * @swagger
 * /filial:
 *   get:
 *     summary: Barcha filiallarni olish
 *     description: Barcha filiallarni qaytaradi.
 *     tags:
 *       - Filial
 *     responses:
 *       200:
 *         description: Barcha filiallar muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   location:
 *                     type: string
 *                     description: Filialning joylashuvi
 *                   photo:
 *                     type: string
 *                     description: Filialning rasmi
 *                   regionId:
 *                     type: integer
 *                     description: Regionning IDsi
 *                   phone:
 *                     type: string
 *                     description: Filialning telefon raqami
 *                   address:
 *                     type: string
 *                     description: Filial manzili
 *                   centerId:
 *                     type: integer
 *                     description: Markaz IDsi
 *       500:
 *         description: Server xatosi
 */
filialRouter.get("/", findAll);

/**
 * @swagger
 * /filial/{id}:
 *   get:
 *     summary: Filialni ID bo'yicha olish
 *     description: Berilgan IDga asoslanib biror filialni olish.
 *     tags:
 *       - Filial
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Filialning IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Filial muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location:
 *                   type: string
 *                   description: Filialning joylashuvi
 *                 photo:
 *                   type: string
 *                   description: Filialning rasmi
 *                 regionId:
 *                   type: integer
 *                   description: Regionning IDsi
 *                 phone:
 *                   type: string
 *                   description: Filialning telefon raqami
 *                 address:
 *                   type: string
 *                   description: Filial manzili
 *                 centerId:
 *                   type: integer
 *                   description: Markaz IDsi
 *       404:
 *         description: Filial topilmadi
 *       500:
 *         description: Server xatosi
 */
filialRouter.get("/:id", findOne);

/**
 * @swagger
 * /filial:
 *   post:
 *     summary: Yangi filial yaratish
 *     description: Yangi filial yaratish uchun zarur bo'lgan ma'lumotlarni yuboradi.
 *     tags:
 *       - Filial
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 description: Filialning joylashuvi
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Filial rasmi
 *               regionId:
 *                 type: integer
 *                 description: Region IDsi
 *               phone:
 *                 type: string
 *                 description: Filial telefon raqami
 *               address:
 *                 type: string
 *                 description: Filial manzili
 *               centerId:
 *                 type: integer
 *                 description: Markaz IDsi
 *     responses:
 *       201:
 *         description: Filial muvaffaqiyatli yaratildi
 *       400:
 *         description: Yomon so'rov
 *       500:
 *         description: Server xatosi
 */
filialRouter.post("/", upload.single("photo"), create);

/**
 * @swagger
 * /filial/{id}:
 *   patch:
 *     summary: Filialni yangilash
 *     description: Berilgan IDga asoslanib filialni yangilash.
 *     tags:
 *       - Filial
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Filialning IDsi
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 description: Filialning yangi joylashuvi
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Filialning yangi rasmi
 *               phone:
 *                 type: string
 *                 description: Filialning yangi telefon raqami
 *               address:
 *                 type: string
 *                 description: Filialning yangi manzili
 *     responses:
 *       200:
 *         description: Filial muvaffaqiyatli yangilandi
 *       400:
 *         description: Yomon so'rov
 *       404:
 *         description: Filial topilmadi
 *       500:
 *         description: Server xatosi
 */
filialRouter.patch("/:id", upload.single("photo"), update);

/**
 * @swagger
 * /filial/{id}:
 *   delete:
 *     summary: Filialni o'chirish
 *     description: Berilgan IDga asoslanib filialni o'chirish.
 *     tags:
 *       - Filial
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chirilishi kerak bo'lgan filialning IDsi
 *         type: integer
 *     responses:
 *       200:
 *         description: Filial muvaffaqiyatli o'chirildi
 *       404:
 *         description: Filial topilmadi
 *       500:
 *         description: Server xatosi
 */
filialRouter.delete("/:id", remove)
export default filialRouter