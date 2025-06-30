import { Router } from "express";
import { BorrowBook } from "../controllers/borrowBook.controller";
import { checkRole } from "../middleware/checkRole";
import { ReturnBook } from "../controllers/returnBook.controller";
import { GetUserBorrowedBooks } from "../controllers/allBorrowedBookByAUser.controller";

const Borrow = Router()

//Borrow Book
Borrow.post("/books/:id", checkRole("Reader"), BorrowBook)

// Get all book a user borrows 
Borrow.get("/all-borrowed",checkRole("Reader"),GetUserBorrowedBooks)

//Return Book
Borrow.patch("/return-book/:bookRecordId", checkRole("Reader"), ReturnBook)



export default Borrow   