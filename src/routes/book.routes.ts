import { Request, Response, NextFunction, Router } from "express";
import { checkRole } from "../middleware/checkRole";
import { NewBookController } from "../controllers/newBook.controller";
import { FindByISBN } from "../controllers/findBookByISBN.controller";
import { FindAllBooks } from "../controllers/findAllBooks.controller";
import { FindByGenre } from "../controllers/findBookByGenre.controller";
import { DeleteBook } from "../controllers/deleteBook.controller";
import { AddBookCopies } from "../controllers/manageBookCopies.controller";

const BookRoutes = Router()


BookRoutes.post(
    "/new",
    checkRole("Librarian", "Admin"),
    NewBookController
);

//Get all books
BookRoutes.get("/", checkRole("Librarian", "Admin"), FindAllBooks)

//Get book by ISBN
BookRoutes.get("/by-isbn", checkRole("Librarian", "Admin"), FindByISBN)

//Search By Genre
BookRoutes.get("/by-genre", checkRole("Librarian", "Admin"), FindByGenre)

// Add/Remove Number of available copies 
BookRoutes.post("/manage-copies/:id", checkRole("Librarian","Admin"), AddBookCopies)

// Delete Book By Primary Key 
BookRoutes.delete("/delete/:id", checkRole("Admin"), DeleteBook)

export default BookRoutes