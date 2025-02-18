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
            references:{
                model:User,
                key:"id"
            },
            allowNull: false
        },
        majorityId: {
            type: DataTypes.INTEGER,
            references:{
                model:Majority,
                key:"id"
            },
            allowNull: false
        },
        centerId: {
            type: DataTypes.INTEGER,
            references:{
                model:Center,
                key:"id"
            },
            allowNull: false
        },
    }
)
User.belongsToMany(Center, { through: SigninCourse, foreignKey: "userId", otherKey: "centerId", onDelete: "CASCADE" })
Center.belongsToMany(User, { through: SigninCourse, foreignKey: "centerId", otherKey: "userId", onDelete: "CASCADE" })

SigninCourse.belongsTo(User, { foreignKey: "userId" })
SigninCourse.belongsTo(Center, { foreignKey: "centerId" })
SigninCourse.hasMany(Majority, { foreignKey: "majorityId" })
Majority.belongsTo(SigninCourse, { foreignKey: "majorityId" })
User.hasMany(SigninCourse, { foreignKey: "userId" })
Center.hasMany(SigninCourse, { foreignKey: "centerId" })



// // Many-to-Many relationship between User and Center through SigninCourse
// User.belongsToMany(Center, { through: SigninCourse, foreignKey: "userId", otherKey: "centerId", onDelete: "CASCADE" });
// Center.belongsToMany(User, { through: SigninCourse, foreignKey: "centerId", otherKey: "userId", onDelete: "CASCADE" });

// // SigninCourse has a foreign key to Majority
// SigninCourse.belongsTo(Majority, { foreignKey: "majorityId" }); // Assuming SigninCourse references Majority via majorityId

// SigninCourse.belongsTo(User, { foreignKey: "userId" });
// SigninCourse.belongsTo(Center, { foreignKey: "centerId" });

// // One-to-many: SigninCourse has many Majorities
// SigninCourse.hasMany(Majority, { foreignKey: "signinCourseId" }); // Ensure that Majority has a foreignKey to SigninCourse (signinCourseId)

// Majority.belongsTo(SigninCourse, { foreignKey: "signinCourseId" }); // Assuming Majority has a foreign key reference to SigninCourse

// User.hasMany(SigninCourse, { foreignKey: "userId" });
// Center.hasMany(SigninCourse, { foreignKey: "centerId" });

export default SigninCourse