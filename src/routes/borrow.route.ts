import { Router } from "express";
import { BorrowBook } from "../controllers/borrowBook.controller";
import { checkRole } from "../middleware/checkRole";
import { ReturnBook } from "../controllers/returnBook.controller";

const Borrow = Router()

//Borrow Book
Borrow.post("/book/:id", checkRole("Reader"), BorrowBook)

//Return Book
Borrow.patch("/return-book/:bookRecordId", checkRole("Reader"), ReturnBook)



export default Borrow   