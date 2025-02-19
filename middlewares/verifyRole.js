import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function verifyRole(newData){
return (req,res,next)=>{
let token = req.header("Authorization");

if(!token){
    return res.status(403).send({error:"Token not found"});
}
try {
    let data = jwt.verify(token, process.env.TOKENKEY);
    if(newData.includes(data.role)){
        req.user = data;
        next();
    }else{
        return res.status(403).send({error:"You can't take action"});
    }
    

} catch (error) {
    res.status(403).send({Error:"Wrong token"});
    console.log({error});
    
}
}
}
export default verifyRole;

