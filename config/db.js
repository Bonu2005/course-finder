import { Sequelize } from "sequelize";

 const sequelize = new Sequelize({
    database:"course_finder",
    username:"root",
    password:"bonu2005",
    host:"localhost",
    dialect:"mysql",
    logging:false
})
export default sequelize