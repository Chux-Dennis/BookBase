import { DataTypes } from "sequelize";
import SequelizeConfig from "../db/config";
import { BorrowInstance } from "./Borrow.model.interface";

const BorrowRecord = SequelizeConfig.define<BorrowInstance>("borrow_record", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    bookId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    borrowDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("active", "returned", "overdue"),
        defaultValue: "active",
    },
});

BorrowRecord.sync().then(() => {
    console.log("Borrow record table synced successfully");

}).catch((err) => {
    console.log(err);
    console.log("Error in syncing borrow record table");
})

export default BorrowRecord