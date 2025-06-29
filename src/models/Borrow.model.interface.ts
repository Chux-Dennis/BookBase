import { Model } from "sequelize";

export interface BorrowAttributes {
    bookId?: string,
    userId?: string,
    borrowDate?:Date,
    dueDate?:Date,
    returnDate?:Date,
    status:"active"|"returned"|"overdue",
    id?:string,

}

export interface BorrowInstance extends Model<BorrowAttributes>, BorrowAttributes { }
