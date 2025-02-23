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
otp.totp.options = { step: 500, digits: 5 };
const usedOtps = new Set();

function generateTokens(user) {
    const accessToken = jwt.sign(
        { id: user.id, role: user.role, type: user.type }, 
        process.env.accesstoken, 
        { expiresIn: "1h" }
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
        
        let {email} = req.body
      
        console.log(email);
        
        if(!isGmail(email)){
            return res.status(400).send({error:"The email you entered is in an incorrect format"});
        }
        let data = await User.findOne({where:{email}});
        if(data){
            return res.status(409).send({error:"This email is already registered!"});
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
        res.status(200).send({success:"Verified successfully!"});
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
        let {filename}=req.file
        let {value, error} = userValidate(req.body);
        if(error){
           fs.unlinkSync(`./uploadsUser/${filename}`)  
            return res.status(400).send({error:error.details[0].message});
        }
        let {phone, ...rest} = value;
        if(!isGmail(rest.email)){
            return res.status(400).send({error:"The email you entered is in an incorrect format"});
        }

        let newPhone = check_phone(phone);
        
        if(!newPhone){
            return res.status(400).send({error:"Example for phone: 998567345634"});
        }

        let hashedPassword = bcrypt.hashSync(rest.password, 10);
        rest.password=hashedPassword
        let checkemail = await tempModel.findOne({where:{email:rest.email}});
        if(!checkemail){
            return res.status(409).send({error:"This email is not verified or has already been registered!"});
        }
        if(rest.role==="ADMIN"){
            return res.status(403).send({error:"Registering as an admin is not allowed."});
        }
        if(!rest.type){
            return res.status(400).send({error:"Type is required."});
        }
        // rest.type = "NOTYPE"
        rest.type = rest.type.toUpperCase();
        rest.role = rest.role ? rest.role.toUpperCase() : "USER";
        
        let newUser = await User.create({image:filename,phone:newPhone,...rest});
        await tempModel.destroy({where:{email:rest.email}});

        const tokens = generateTokens(rest);

        res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.nodeenv === 'qwerty', 
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    res.status(200).send({
        message: "Successful registration!",
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
            return res.status(400).send({error:"The email you entered is in an incorrect format"});
        }
        let checkemail = await User.findOne({where:{email}});
        if(!checkemail){
            return res.status(404).send({error:"This email is not registered or is incorrect!"});
        }
        let compPass = bcrypt.compareSync(password, checkemail.password);
        if(!compPass){
            return res.status(401).send({error:"This password is incorrect!"});
        }
        const tokens = generateTokens(checkemail);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.nodeenv === 'qwerty', 
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        res.status(200).send({
            message: "Successful login!",
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
        let data = await User.findAndCountAll({where:where,limit:limit,offset:offset,order:order,attributes:["fullName","phone","image","type"]});
        if(!data){
            return res.status(400).json({error:"There are no users at the moment!"})
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
            return res.status(404).send({error:"User not found!"});
        }
        return res.status(200).send({"Data":data});
    } catch (error) {
        res.status(500).send({error:error.message});
        console.log({error});
    }
}

async function createAdmin(req, res) {
    try {
        if(!req.file){
            return  res.status(404).json({message:"No file uploded"})
          }
        let {value, error} = userValidate(req.body);
        if(error){
            fs.unlinkSync(`./uploadsSubject/${filename}`)  
            res.status(400).send({error:error.details[0].message});
        }
        
        let image = req.file.filename;
        let {fullName, email, password, phone, type, role} = value;

        let newPhone = check_phone(phone);
        if(!newPhone){
            return res.status(400).send({error:"Example for phone: 998567345634"});
        }

        if(type){
        type = type.toUpperCase();}
        role = role ? role.toUpperCase() : "USER";
           
        if(!isGmail(email)){
            return res.status(400).send({error:"The email you entered is in an incorrect format"});
        }
        let checkemail = await User.findOne({where:{email}});
        if(checkemail){
            return res.status(409).send({error:"This email is already registered!"});
        }
        let hashPas = bcrypt.hashSync(password, 10);
        if(role==="USER"&&role!=="ADMIN"){
            return res.status(403).send({error:"It is only possible to create an admin"});
        }
        if(role==="ADMIN"){
            if(type){
                return res.status(400).send({error:"Admin does not have a type."});
            }
            if(type==undefined){
                type='NOTYPE';
            }
        } 
        let data = await User.create({fullName, image, email, password:hashPas, phone:newPhone, type, role});
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
            return res.status(400).send({error:"The email you entered is in an incorrect format."});
        }
        let data = await User.findOne({where:{id,email}});
        if(!data){
            return res.status(404).send({error:"You entered an incorrect email or ID."});
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
          res.status(200).send({success:"Please verify the OTP code to update your data!"});

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
            return res.status(400).send({ error: "This OTP has been used, please request a new OTP." });
        }
        if (!otp.totp.check(otp2, secret)) {
            return res.status(400).send({ error: "Incorrect OTP!" });
        }
        usedOtps.add(otp2);

        let dat = await User.findOne({ where: { email: oldemail } });
        if (!dat) {
            return res.status(404).send({ error: "User not found." });
        }

        let oldimage = dat.dataValues.image;
        let newImage = req.file ? req.file.filename : oldimage;

        if(phone){
            phone = check_phone(phone);
                if(!phone){
                    return res.status(400).send({error:"Example for phone: 998567345634"});
        }}
        if(role){
        role = role ? role.toUpperCase() : "USER";
            if (role === "ADMIN") {
                if (type) {
                    return res.status(400).send({ error: "Admin does not have a type." });
            }
                type = "NOTYPE";
        }}
        if (role === "USER") {
            if (!type) {
                return res.status(400).send({ error: "A user must have a type." });
            }
            type = type.toUpperCase();
        }

        

        fullName ||= dat.fullName;
        type ||= dat.type;
        email ||= dat.email;
        phone ||= dat.phone
        password ||= dat.password;
        role ||= dat.role;

        let hash = bcrypt.hashSync(password, 10);
        await User.update(
            { fullName, image: newImage, email, password: hash, phone, type, role },{ where: { email: oldemail } });

        if (req.file && oldimage && oldimage !== newImage) {
            const filePath = `uploadsUser/${oldimage}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        
        res.status(200).send({ success: "Updated successfully!" });
    } catch (error) {
        res.status(500).send({ error: error.message });
        console.log({ error });
    }
}

// async function updateself(req, res) {
//     try {
//         let { value, error } = usersPatchValidate(req.body);
//         if (error) {
//             return res.status(400).send({ error: error.details[0].message });
//         }
//         let { fullName, email, password, phone, type, role } = value;
//         let { id } = req.params;

//         let dat = await User.findOne({ where: { id } });
//         if (!dat) {
//             return res.status(404).send({ error: "User not found." });
//         }

//         let oldimage = dat.dataValues.image;
//         let newImage = req.file ? req.file.filename : oldimage;

//         if(phone){
//             phone = check_phone(phone);
//                 if(!phone){
//                     return res.status(400).send({error:"Example for phone: 998567345634"});
//         }}
//         if(role){
//         role = role ? role.toUpperCase() : "USER";
//             if (role === "ADMIN") {
//                 if (type) {
//                     return res.status(400).send({ error: "Admin does not have a type." });
//             }
//                 type = "NOTYPE";
//         }}
//         if (role === "USER") {
//             if (!type) {
//                 return res.status(400).send({ error: "A user must have a type." });
//             }
//             type = type.toUpperCase();
//         }

        

//         fullName = dat.fullName;
//         type = dat.type;
//         email = dat.email;
//         phone = dat.phone
//         password = dat.password;
//         role = dat.role;

//         let hash = bcrypt.hashSync(password, 10);
//         await User.update(
//             { fullName, image: newImage, email, password: hash, phone, type, role },{ where: {id } });

//         if (req.file && oldimage && oldimage !== newImage) {
//             const filePath = `uploadsUser/${oldimage}`;
//             if (fs.existsSync(filePath)) {
//                 fs.unlinkSync(filePath);
//             }
//         }
        
//         res.status(200).send({ success: "Updated successfully!" });
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//         console.log({ error });
//     }
// }

async function remove(req, res){
    try {
        let {id} = req.params; 
        let dat = await User.findOne({where:{id}});
        if(!dat){
          return res.status(400).send({error:"User not found."});   
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
        res.status(200).send({success:"You have logged out."});
    } catch (error) {
        res.status(500).send({error:error.message});
        console.log({error});
    }
}

export {send_otp, verify_otp, register, login, findAll, findOne, createAdmin, update, remove, send_update_otp, logout};
