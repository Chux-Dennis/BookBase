import { Response, Request, NextFunction } from "express";
import BorrowRecord from "../models/Borrow.model";
import { borrowValidate } from "../validations/borrow.validate";
import Book from "../models/Book.model";
import { BorrowAttributes } from "../models/Borrow.model.interface";

export const BorrowBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ success: false, message: "No payload provided." });
        return
    }

    const { error } = borrowValidate.validate(req.body)

    if (error) {
        res.status(400).json({ success: false, message: error.details[0].message });
        return
    }
    const { id } = req.params
    const { dueDate } = req.body
    const userId = (req as any).user.id


    try {
        const book = await Book.findByPk(id)

        if (!book) {
            res.status(400).send({ message: "Book not found" })
            return
        }

        if (new Date(dueDate) < new Date()) {
            res.status(400).send({ message: "Incorrect, put a future date." })
            return
        }
        //Check if the same book book has been borrowed already
        const foundBook = await BorrowRecord.findOne({ where: { bookId: id, userId: userId } })

        if (foundBook) {
            res.status(400).send({ message: "Book has already been borrowed." })
            return
        }

        const newBorrowEntry = await BorrowRecord.create({
            dueDate,
            borrowDate: new Date(),
            bookId: id,
            status: "active",
            userId,
        })


        await newBorrowEntry.save()
        res.status(201).send({ message: "Book Borrowed Successfully", data: newBorrowEntry })

    } catch (error) {

    }

}