import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function verifyToken(req, res, next) {
    try {
       let header = req.header("Authorization");
       let [_, token] = header.split(" ");
 
       if (!token) {
          return res.status(401).send({ msg: "Empty token" });
       }
 
       let accessSecret = process.env.accessKey || "access-secret";
       let data = jwt.verify(token, accessSecret);
 
       User.findByPk(data.id)
          .then((user) => {
             if (!user) {
                return res.status(401).json({ message: "Not allowed..." });
             }
 
             req.user = data;
             next();
          })
          .catch((err) => {
             return res
                .status(500)
                .json({ msg: "Server error", error: err.message });
          });
 
    } catch (error) {
       res.status(401).send({ msg: "Invalid token" });
    }
 }
 
 export default verifyToken;