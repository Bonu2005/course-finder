import { Sequelize } from "sequelize";

 const sequelize = new Sequelize({
    database:"course_finder",
    username:"root",
    timezone: "+06:00",
    password:"bonu2005",
    host:"localhost",
    dialect:"mysql",
    logging:false
})
export default sequelize