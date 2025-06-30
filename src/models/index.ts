///Table Relationships come here

import Book from "./Book.model";
import User from "./User.model";
import BorrowRecord from "./Borrow.model";


BorrowRecord.belongsTo(Book, { foreignKey: "bookId", as: "book" });

Book.hasMany(BorrowRecord, { foreignKey: "bookId", as: "borrowRecords" });
BorrowRecord.belongsTo(User, { foreignKey: "userId", as: "user" });
