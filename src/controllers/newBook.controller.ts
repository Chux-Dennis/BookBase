import { Request, Response, NextFunction } from "express";
import Book from "../models/Book.model";
import { BookInstance } from "../models/Book.model.interface";
import { validateBook } from "../validations/book.validate";

export const NewBookController = async (req: Request, res: Response, net: NextFunction): Promise<any> => {

    console.log(req.body);

    if (!req.body || Object.keys(req.body).length < 1) {
        res.status(400).send({ message: "No payload Passsed" })
        return
    }

    const { error } = validateBook.validate(req.body)
    const { isbn,
        title,
        author,
        year,
        genre,
        publisher } = req.body

    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message }); return
    }

    try {

        ///Check if book exits 

        const existingBook = await Book.findOne({ where: { isbn: isbn } })

        if (existingBook) {
            return res.status(400).send({ message: "Book with this ISBN already exists.", success: false })
        }

        const newBook = await Book.create({
            isbn,
            author,
            genre,
            publisher,
            title,
            year,
            copiesAvailable: 0,
            copiesTotal: 0
        })

        await newBook.save()

        res.status(201).send({ message: "New Book Added Succesfully", success: true })
    } catch (error) {
        console.log(error);

    }
}