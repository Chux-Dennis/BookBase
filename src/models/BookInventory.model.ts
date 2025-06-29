import { DataTypes } from "sequelize";
import SequelizeConfig from "../db/config";
import { BookInventoryInstance } from "./BookInventory.model.interface";

const BookInventory = SequelizeConfig.define<BookInventoryInstance>("book_inventory", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    bookId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    transactionType:{
        type:DataTypes.ENUM("entry","removal"),
        allowNull:false
    },
    adjustment: {
        type: DataTypes.INTEGER, // e.g. +5, -2
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    }
})

BookInventory.sync().then(()=>{
    console.log("Book Inventory Table synced successfully");
    
}).catch((err)=>{
    console.log("error in synncing book inventory table");
    
})


export default BookInventory