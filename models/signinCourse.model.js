import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Center from "./center.model.js";
import Majority from "./majority.model.js";
import Filial from "./filial.model.js";

const SigninCourse = sequelize.define(
    "signinCourse",
    {
        userId: {
            type: DataTypes.INTEGER,
            references:{
                model:User,
                key:"id"
            },
         
        },
        majorityId: {
            type: DataTypes.INTEGER,
            references:{
                model:Majority,
                key:"id"
            },
       
        },
        filialId: {
            type: DataTypes.INTEGER,
            references:{
                model:Filial,
                key:"id"
            },
           
        },
        status:{
            type:DataTypes.STRING
        },
        
    },
    {tableName:"signinCourse"}
)
User.belongsToMany(Filial, { through: SigninCourse, foreignKey: "userId", otherKey: "filialId", onDelete: "CASCADE" })
Filial.belongsToMany(User, { through: SigninCourse, foreignKey: "filialId", otherKey: "userId", onDelete: "CASCADE" })
SigninCourse.belongsTo(User, { foreignKey: "userId" })
SigninCourse.belongsTo(Filial, { foreignKey: "filialId" })
SigninCourse.hasMany(Majority, { foreignKey: "majorityId" })
Majority.belongsTo(SigninCourse, { foreignKey: "majorityId" })
User.hasMany(SigninCourse, { foreignKey: "userId" })
Filial.hasMany(SigninCourse, { foreignKey: "filialId" })

export default SigninCourse