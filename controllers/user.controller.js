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
dotenv.config();
otp.totp.options = { step: 1800, digits: 5 };
async function send_otp(req, res) {
    try { 
        console.log("hi");
        let email = req.body.email;
        if(!isGmail(email)){
            return res.status(403).send("Emailning oxiri @gmail.com bilan tugashi shart");
        }
        let data = await User.findOne({where:{email}});
        if(data){
            return res.status(403).send("Bu email allqachon ro'yxatdan o'tib bo'lgan!");
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
          await User.create({fullname:null, image:null, email, password:null, phone:null, type:null,role:null});
          res.status(201).send("We have sent a verification code to your email address. Please verify it!");

    } catch (error) {
        res.status(403).send({error:error.message});
        console.log({error});
    }
}

async function verify_otp(req, res) {
    try {
   
        
        let {email, otp1} = req.body;
        let secret = email+process.env.OTPKEY;
        let checkOtp = otp.totp.check(otp1,secret);
        
        if(!checkOtp){
            return res.status(403).send("Wrong otp!");
        }
        res.status(201).send("Virified successfully!");
    } catch (error) {
        res.status(403).send({error:error.message});
        console.log({error});
    }
}

async function register(req, res) {
    try {
        if(!req.file){
            return res.status(403).send({error:"No file uploded"}); 
        }
        let {value, error} = userValidate(req.body);
        if(error){
            return res.status(403).send({error:error.details[0].message});
        }
        let {filename}=req.file
        if(!check_phone(value.phone)){
            return res.status(403).send("Phone +998 bilan boshlanishi shart");
        }
        let hashedPassword = bcrypt.hashSync(value.password, 10);
        value.password=hashedPassword
        let checkemail = await User.findOne({where:{email:value.email}});
        
        if(!checkemail){
            return res.status(403).send("Bu email tasdiqlanmagan!");
        }
        if(value.role==="admin"){
            return res.status(403).send("Admin bo'lib ro'yxatdan o'tish taqiqlanadi.");
        }
        if(!value.type){
            return res.status(403).send("Type bo'lishi shart.");
        }
        if(value.role==undefined){
            value.role = "user"
        }
        await User.update({image:filename,...value},{where:{email:value.email}});
        res.status(201).send("User registered successfully!");
    } catch (error) {
        res.status(403).send({error:error.message});
        console.log({error});
    }
} 

function generateTokens(user) {
    const accessToken = jwt.sign(
        { id: user.id, role: user.role, type: user.type }, 
        process.env.accesstoken, 
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: user.id }, 
        process.env.refreshtoken, 
        { expiresIn: "7d" } 
    );

    return { accessToken, refreshToken };
}

async function login(req, res) {
    try {
        let {email, password} = req.body;
        if(!isGmail(email)){
            return res.status(403).send("Emailning oxiri @gmail.com bilan tugashi shart");
        }
        let checkemail = await User.findOne({where:{email}});
        if(!checkemail){
            return res.status(403).send("Bu email ro'yxatdan o'tmagan yoki noto'g'ri!");
        }
        let compPass = bcrypt.compareSync(password, checkemail.password);
        if(!compPass){
            return res.status(403).send("Bu parol xato!");
        }
        const tokens = generateTokens(checkemail);

        res.status(201).send({
            message: "Muvaffaqiyatli login!",
            checkemail,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
    
    } catch (error) {
        res.status(403).send({error:error.message});
        console.log({error});
    }
}

async function findAll(req, res) {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        let offset = (page - 1) * limit;

        let { count, rows } = await User.findAndCountAll({limit, offset});

        if (rows.length === 0) {
            return res.status(404).send({ message: "Hech nima topilmadi!" });
        }

        return res.status(200).send({page,limit,totalUsers: count,totalPages: Math.ceil(count / limit),users: rows});

    } catch (error) {
        res.status(500).send({ error: error.message });
        console.log({ error });
    }
}

async function findOne(req, res) {
    try {
        let {id} = req.params;
        let data = await User.findOne({where:{id}});
        if(!data){
            return res.status(403).send("User topilmadi!");
        }
        return res.status(201).send({"Malumot":data});
    } catch (error) {
        res.status(403).send({error:error.message});
        console.log({error});
    }
}

async function create(req, res) {
    try {
        let {value, error} = userValidate(req.body);
        if(error){
            res.status(403).send({error:error.details[0].message});
        }
        
        let image = req.file.filename;
        let {fullName, email, password, phone, type, role} = value;

        if(!check_phone(phone)){
            return res.status(403).send("Phone +998 bilan boshlanishi shart");
        }
           
        if(!isGmail(email)){
            return res.status(403).send("Emailning oxiri @gmail.com bilan tugashi shart");
        }
        let checkemail = await User.findOne({where:{email}});
        if(checkemail){
            return res.status(403).send("Bu email ro'yxatdan o'tib bo'lgan!");
        }
        let hashPas = bcrypt.hashSync(password, 10);
        if(role==="user"&&role!=="admin"){
            return res.status(403).send({error:"Faqat admin yaratish mumkin"});
        }
        if(role==="admin"){
            if(type){
                return res.status(403).send({error:"Adminda type bo'lmaydi"});
            }
            if(type==undefined){
                type='notype';
            }
        } 
        let data = await User.create({fullName, image, email, password:hashPas, phone, type, role});
        res.status(201).send({"Admin created successfully!":data});
    } catch (error) {
        res.status(403).send({error:error.message});
        console.log({error});
    }
}

async function send_update_otp(req, res) {
    try {
        let {id} = req.params;
        let email = req.body.email;
        if(!isGmail(email)){
            return res.status(403).send("Emailning oxiri @gmail.com bilan tugashi shart");
        }
        let data = await User.findOne({where:{id,email}});
        if(!data){
            return res.status(403).send("Noto'gri email yoki id kiritdingiz");
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
          res.status(201).send("Please verify otp code, to update your datas!");

    } catch (error) {
        res.status(403).send({error:error.message});
        console.log({error});
    }
}

async function update(req, res){
    try {
        let {value, error} = usersPatchValidate(req.body);
        if(error){
            return res.status(403).send({error:error.details[0].message});
        }
        let {fullName, email, password, phone, type, role} = value;
        let {otp2, oldemail} = req.params;
        let secret = oldemail+process.env.OTPKALIT;
        
        let checkOtp = otp.totp.check(otp2,secret);
        console.log(checkOtp);
        
        if(!checkOtp){
            return res.status(403).send({error:"Noto'g'ri otp!"});
        }
        let dat = await User.findOne({where:{email:oldemail}});
        if(!dat){
            res.status(403).send({error:"Foydalanuvchi topilmadi."});
        }  
        
        
        let oldimage = dat.dataValues.image;
        let image = req.file ? req.file.filename : oldimage;
        if (image){
               fs.unlinkSync(`uploads/${oldimage}`); 
        }

        if(!check_phone(phone)){
            return res.status(403).send("Phone +998 bilan boshlanishi shart");
        }

        if(role==="admin"){ 
            if(type){
                return res.status(403).send({error:"Adminda type bo'lmaydi"});
            }        
            type = "notype";     
        } 

        if(role==="user"){ 
            if(!type){
                return res.status(403).send({error:"Userda type bo'lishi shart"});
            }            
        } 

        fullName ||= dat.fullName;
        type ||= dat.type;
        email ||= dat.email;
        password ||= dat.password;
        phone ||= dat.phone;
        role ||= dat.role;

        let hahs = bcrypt.hashSync(password, 10);
        await User.update({fullName, image, email, password:hahs, phone, type, role}, {where:{email:oldemail}});
        res.status(201).send("updated");
    } catch (error) {
        res.status(403).send({error:error.message});
        console.log({error});
    }
}

async function remove(req, res){
    try {
        let {id} = req.params; 
        let dat = await User.findOne({where:{id}});
        if(!dat){
            res.status(403).send({error:"Foydalanuvchi topilmadi."});
        }  
        if (dat.image) {
            let imagePath = path.join("uploads", dat.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); 
            }
        }
        await User.destroy({where:{id}});
        res.status(403).send("Deleted");
    } catch (error) {
        res.status(403).send({error:error.message});
        console.log({error});
    }
}

export {send_otp, verify_otp, register, login, findAll, findOne, create, update, remove, send_update_otp};
