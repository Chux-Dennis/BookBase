import { DataTypes, DATE } from "sequelize";
import SequelizeConfig from "../db/config";
import { BookInstance } from "./Book.model.interface";

const Book = SequelizeConfig.define<BookInstance>("book", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    copiesAvailable: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    copiesTotal: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    publisher: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }

}, {
    paranoid: true
})

Book.sync().then(() => {
    console.log("Book Table synced succesfully")
}).catch(err => {
    console.log(err);

    console.log("An error occured in syncing book table");

})

export default Book