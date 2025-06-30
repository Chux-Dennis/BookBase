///Table Relationships come here

import Book from "./Book.model";
import BorrowRecord from "./Borrow.model";


BorrowRecord.belongsTo(Book, { foreignKey: "bookId", as: "book" });
