import { DataTypes } from "sequelize";
import SequelizeConfig from "../db/config";
import { UserAttributes,UserInstance } from "./User.model.interface";

const User = SequelizeConfig.define<UserInstance>("user", {
    id: {
        type: DataTypes.UUID,
        //   autoIncrement: true,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BIGINT,
        defaultValue: false
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    otpExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM("Admin", "Librarian", "Reader"),
        defaultValue: "Reader",
        allowNull: false,
    },

})

User.sync().then(() => {
    console.log("User table synced successfully");

}).catch((err) => {
    console.log("Error occurred when trying to sync User table");
    console.log(err);


})

export default User