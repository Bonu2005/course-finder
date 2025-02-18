import express from "express"
import { config } from "dotenv"
import sequelize  from "./config/db.js"
import mainRouter from "./routes/index.js"
config()
const app = express()

app.use(express.json())
app.use("/",mainRouter)
async function dbConnection() {
    await sequelize.sync()
    console.log("mysql connected");
    app.listen(process.env.PORT,()=>{
        console.log(`server is run on port ${process.env.PORT}`);
    })
}

dbConnection()
