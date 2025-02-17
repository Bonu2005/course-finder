import express from "express"
import { config } from "dotenv"
import sequelize  from "./config/db.js"
config()
const app = express()

app.use(express.json())
async function dbConnection() {
    await sequelize.sync({force:true})
    console.log("mysql connected");
    app.listen(process.env.PORT,()=>{
        console.log(`server is run on port ${process.env.PORT}`);
        
    })
}
dbConnection()
