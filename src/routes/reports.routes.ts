import { Router } from "express";
import { checkRole } from "../middleware/checkRole";
import { GetMostBorrowedBooks } from "../controllers/mostBorrowedBook.controller";
import { GetBestPerformingReaders } from "../controllers/bestPerformingUser.controller";

const Reports = Router()

Reports.get("/books",checkRole("Admin","Librarian"),GetMostBorrowedBooks)

Reports.get("/users",checkRole("Admin","Librarian"),GetBestPerformingReaders)



export default Reports