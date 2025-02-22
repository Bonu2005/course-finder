import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function verifyType(newData){
return (req,res,next)=>{
let token = req.header("Authorization");

if(!token){
    return res.status(403).send({error:"Token not found"});
}

if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
}

try {
    let data = jwt.verify(token, process.env.accesstoken);
    if(newData.includes(data.type) || newData.includes(data.role)){
        req.user = data;
        next();
    }else{
        return res.status(401).send({error:"You can't take action"});
    }
    

} catch (error) {
    res.status(403).send({Error:"Wrong token"});
    console.log({error});
    
}
}
}
export default verifyType;

