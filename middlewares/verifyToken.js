import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const verifyToken = (req,res,next)=>{
let token = req.header("Authorization");

if(!token){
    return res.status(401).send({error:"Token not found"});
}

if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
}
try {
    let data = jwt.verify(token, process.env.accesstoken);
    req.user = data;
    next();
} catch (error) {  
    res.status(401).send({Error:"Wrong token"});
    console.log({error});
    
}
}

export default verifyToken;
