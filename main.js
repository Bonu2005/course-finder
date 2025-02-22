import express from "express"
import { config } from "dotenv"
import sequelize from "./config/db.js"
import mainRouter from "./routes/index.js"
import { specs } from "./config/swagger.js"
import swaggerUi from "swagger-ui-express";

config()

let app = express()


// app.use(express.json())
app.use("/", mainRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

async function dbConnection() {
    await sequelize.sync({ force: true })
    console.log("mysql connected");
    app.listen(process.env.PORT, () => {
        console.log(`server is run on port ${process.env.PORT}`);
    })
}
dbConnection()
