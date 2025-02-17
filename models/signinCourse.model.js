import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Center from "./center.model.js";
import Majority from "./majority.model.js";

const SigninCourse = sequelize.define(
    "signinCourse",
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        majorityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        centerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }
)
User.belongsToMany(Center,{through:SigninCourse,foreignKey:"userId",otherKey:"centerId",onDelete:"CASCADE"})
Center.belongsToMany(User,{through:SigninCourse,foreignKey:"centerId",otherKey:"userId",onDelete:"CASCADE"})
SigninCourse.belongsTo(User,{foreignKey:"userId"})
SigninCourse.belongsTo(Center,{foreignKey:"centerId"})
SigninCourse.belongsTo(Majority,{foreignKey:"majorityId"})
User.hasMany(SigninCourse,{foreignKey:"userId"})
Center.hasMany(SigninCourse,{foreignKey:"centerId"})
export default SigninCourse