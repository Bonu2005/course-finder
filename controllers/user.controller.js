import User from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import {userValidate, usersPatchValidate} from "../validations/user.validation.js";
import {isGmail, check_phone} from "../validations/emailPhone.validation.js";
import nodemailer from "nodemailer";
import otp from 'otplib';
import jwt from "jsonwebtoken";
import path from 'path';
import fs from "fs";
import tempModel from "../models/temp.model.js";

import {Op} from "sequelize"
dotenv.config();
otp.totp.options = { step: 600, digits: 5 };
const usedOtps = new Set();

function generateTokens(user) {
    const accessToken = jwt.sign(
        { id: user.id, role: user.role, type: user.type }, 
        process.env.accesstoken, 
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: user.id, role: user.role, type: user.type }, 
        process.env.refreshtoken, 
        { expiresIn: "7d" } 
    );

    return { accessToken, refreshToken };
}

async function send_otp(req, res) {
    try { 
        console.log("hi");
        let email = req.body.email;
        if(!isGmail(email)){
            return res.status(400).send({error:"Siz kiritgan email no'tog'ri formatda"});
        }
        let data = await User.findOne({where:{email}});
        if(data){
            return res.status(409).send({error:"Bu email allqachon ro'yxatdan o'tib bo'lgan!"});
        }
        
        let secret = email+process.env.OTPKEY;
        let otp1 = otp.totp.generate(secret); 
        const transporter = nodemailer.createTransport({
            service: "icloud",
            auth: {
              user: "booonu@icloud.com",
              pass: 'ruwi-csuz-iowu-ggyj',
            },
          });

        await transporter.sendMail({
            from: "<booonu@icloud.com>",
            to: email,
            subject: "Activate your account",  
            html: `<h3>Your otp code: ${otp1}</h3>`,
          });
         
          res.status(200).send({success:"We have sent a verification code to your email address. Please verify it!"});

    } catch (error) {
        res.status(500).send({error:error.message});
        console.log({error});
    }
}

async function verify_otp(req, res) {
    try {
   
        
        let {email, otp1} = req.body;
        let secret = email+process.env.OTPKEY;
        let checkOtp = otp.totp.check(otp1,secret);
        
        if(!checkOtp){
            return res.status(400).send({error:"Wrong otp!"});
        }
        res.status(200).send({success:"Virified successfully!"});
        await tempModel.create({email});
    } catch (error) {
        res.status(500).send({error:error.message});
        console.log({error});
    }
}

async function register(req, res) {
    try {
        if(!req.file){
            return res.status(400).send({error:"No file uploded"}); 
        }
        let {value, error} = userValidate(req.body);
        if(error){
            return res.status(400).send({error:error.details[0].message});
        }
        let {filename}=req.file
        if(!isGmail(value.email)){
            return res.status(400).send({error:"Siz kiritgan email no'tog'ri formatda"});
        }
        if(!check_phone(value.phone)){
            return res.status(400).send({error:"Phone +998 bilan boshlanishi shart"});
        }
        let hashedPassword = bcrypt.hashSync(value.password, 10);
        value.password=hashedPassword
        let checkemail = await tempModel.findOne({where:{email:value.email}});
        if(!checkemail){
            return res.status(409).send({error:"Bu email tasdiqlanmagan yoki ro'yxatdan o'tib bo'lgan!"});
        }
        if(value.role==="admin"){
            return res.status(403).send({error:"Admin bo'lib ro'yxatdan o'tish taqiqlanadi."});
        }
        if(!value.type){
            return res.status(400).send({error:"Type bo'lishi shart."});
        }
        if(value.role==undefined){
            value.role = "user"
        }
        let newUser = await User.create({image:filename,...value});
        await tempModel.destroy({where:{email:value.email}});

        const tokens = generateTokens(value);

        res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.nodeenv === 'qwerty', 
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    res.status(200).send({
        message: "Muvaffaqiyatli registratsiya!",
        newUser,
        accessToken: tokens.accessToken
});

    } catch (error) {
        res.status(500).send({error:error.message});
        console.log({error});
    }
} 

async function login(req, res) {
    try {
        let {email, password} = req.body;
        if(!isGmail(email)){
            return res.status(400).send({error:"Siz kiritgan email no'tog'ri formatda"});
        }
        let checkemail = await User.findOne({where:{email}});
        if(!checkemail){
            return res.status(404).send({error:"Bu email ro'yxatdan o'tmagan yoki noto'g'ri!"});
        }
        let compPass = bcrypt.compareSync(password, checkemail.password);
        if(!compPass){
            return res.status(401).send({error:"Bu parol xato!"});
        }
        const tokens = generateTokens(checkemail);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.nodeenv === 'qwerty', 
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        res.status(200).send({
            message: "Muvaffaqiyatli login!",
            checkemail,
            accessToken: tokens.accessToken
        });
    
    } catch (error) {
        res.status(500).send({error:error.message});
        console.log({error});
    }
}

async function findAll(req,res) {
    try {
        const {page =1,pageSize=10,sortBy,sortOrder="ASC",...filter}=req.query
        const limit = parseInt(pageSize)
        const offset = (page-1)*limit
        const order = []
        if(sortBy){
            order.push([sortBy,sortOrder])
        }
        const where= {}
                Object.keys(filter).forEach((key)=>{where[key]={[Op.like]:`%${filter[key]}%`}})
        let data = await User.findAndCountAll({where:where,limit:limit,offset:offset,order:order});
        if(!data){
            return res.status(400).json({error:"Hozircha userlar yo'q!"})
        }
        res.json({data:data.rows,totalItems:data.count,totalPages:Math.ceil(data.count / limit),currentPage:parseInt(page)})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

async function findOne(req, res) {
    try {
        let {id} = req.params;
        let data = await User.findOne({where:{id}});
        if(!data){
            return res.status(404).send({error:"User topilmadi!"});
        }
        return res.status(200).send({"Malumot":data});
    } catch (error) {
        res.status(500).send({error:error.message});
        console.log({error});
    }
}

async function createAdmin(req, res) {
    try {
        let {value, error} = userValidate(req.body);
        if(error){
            res.status(400).send({error:error.details[0].message});
        }
        
        let image = req.file.filename;
        let {fullName, email, password, phone, type, role} = value;

        if(!check_phone(phone)){
            return res.status(400).send({error:"Phone +998 bilan boshlanishi shart"});
        }
           
        if(!isGmail(email)){
            return res.status(400).send({error:"Siz kiritgan email no'tog'ri formatda"});
        }
        let checkemail = await User.findOne({where:{email}});
        if(checkemail){
            return res.status(409).send({error:"Bu email ro'yxatdan o'tib bo'lgan!"});
        }
        let hashPas = bcrypt.hashSync(password, 10);
        if(role==="user"&&role!=="admin"){
            return res.status(403).send({error:"Faqat admin yaratish mumkin"});
        }
        if(role==="admin"){
            if(type){
                return res.status(400).send({error:"Adminda type bo'lmaydi"});
            }
            if(type==undefined){
                type='notype';
            }
        } 
        let data = await User.create({fullName, image, email, password:hashPas, phone, type, role});
        res.status(201).send({"Admin created successfully!":data});
    } catch (error) {
        res.status(500).send({error:error.message});
        console.log({error});
    }
}

async function send_update_otp(req, res) {
    try {
        let {id} = req.params;
        let email = req.body.email;
        if(!isGmail(email)){
            return res.status(400).send({error:"Siz kiritgan email no'tog'ri formatda"});
        }
        let data = await User.findOne({where:{id,email}});
        if(!data){
            return res.status(404).send({error:"Noto'gri email yoki id kiritdingiz"});
        }
        
        let secret = email+process.env.OTPKALIT;
        let otp2 = otp.totp.generate(secret); 
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "yusupovruzimuhammad4@gmail.com",
              pass: process.env.PAROL,
            },
          });

        await transporter.sendMail({
            from: "<yusupovruzimuhammad4@gmail.com>",
            to: email,
            subject: "Activate your account",  
            html: `<h3>Your otp code: ${otp2}</h3>`,
          });
          res.status(200).send({success:"Please verify otp code, to update your datas!"});

    } catch (error) {
        res.status(500).send({error:error.message});
        console.log({error});
    }
}

async function update(req, res) {
    try {
        let { value, error } = usersPatchValidate(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        let { fullName, email, password, phone, type, role } = value;
        let { otp2, oldemail } = req.params;
        let secret = oldemail + process.env.OTPKALIT;

        if (usedOtps.has(otp2)) {
            return res.status(400).send({ error: "Bu otp ishlatilgan, qaytadan otp oling" });
        }
        if (!otp.totp.check(otp2, secret)) {
            return res.status(400).send({ error: "Noto'g'ri otp!" });
        }
        usedOtps.add(otp2);

        let dat = await User.findOne({ where: { email: oldemail } });
        if (!dat) {
            return res.status(404).send({ error: "Foydalanuvchi topilmadi." });
        }

        let oldimage = dat.dataValues.image;
        let newImage = req.file ? req.file.filename : oldimage;

        if (phone && !check_phone(phone)) {
            return res.status(400).send({ error: "Phone +998 bilan boshlanishi shart" });
        }

        if (role === "admin") {
            if (type) {
                return res.status(400).send({ error: "Adminda type bo'lmaydi" });
            }
            type = "notype";
        }

        if (role === "user") {
            if (!type) {
                return res.status(400).send({ error: "Userda type bo'lishi shart" });
            }
        }

        fullName ||= dat.fullName;
        type ||= dat.type;
        email ||= dat.email;
        password ||= dat.password;
        phone ||= dat.phone;
        role ||= dat.role;

        let hash = bcrypt.hashSync(password, 10);
        await User.update(
            { fullName, image: newImage, email, password: hash, phone, type, role },
            { where: { email: oldemail } }
        );

        if (req.file && oldimage && oldimage !== newImage) {
            const filePath = `uploadsUser/${oldimage}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        
        res.status(200).send({ success: "Updated successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
        console.log({ error });
    }
}

async function remove(req, res){
    try {
        let {id} = req.params; 
        let dat = await User.findOne({where:{id}});
        if(!dat){
            res.status(400).send({error:"Foydalanuvchi topilmadi."});
        }  
        if (dat.image) {
            let imagePath = path.join("uploadsUser", dat.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); 
            }
        }
        await User.destroy({where:{id}});
        res.status(200).send({success:"Deleted"});
    } catch (error) {
        res.status(500).send({error:error.message});
        console.log({error});
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('refreshToken');
        res.status(200).send({success:"Siz tizimdan chiqib ketdingiz"});
    } catch (error) {
        res.status(500).send({error:error.message});
        console.log({error});
    }
}

export {send_otp, verify_otp, register, login, findAll, findOne, createAdmin, update, remove, send_update_otp, logout};
