import { Sequelize } from "sequelize";

 const sequelize = new Sequelize({
    database:"course_finder",
    username:"root",
    password:"1234",
    host:"localhost",
    dialect:"mysql",
    logging:false
})
export default sequelize