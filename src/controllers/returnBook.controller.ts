import { Request, Response, NextFunction } from "express";
import BorrowRecord from "../models/Borrow.model";

export const ReturnBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { bookRecordId } = req.params

    const userId = (req as any).user.id


    try {
        const borrowEntry = await BorrowRecord.findByPk(bookRecordId)

        if (!borrowEntry) {
            res.status(400).send({ message: "Book Borrow Entry not found." })
            return
        }

        // Checking if user returning the book is the valid user 
        if (borrowEntry.userId !== userId) {
            res.status(401).send({ message: "Unauthorized user returning book" })
            return
        }

        // Check if book is returned already 
        if (borrowEntry.status == "returned") {
            res.status(400).send({ message: "Book has been returned already" })
        }

        const updateBorrowEntry = await BorrowRecord.update({
            returnDate: new Date(),
            status: "returned"
        }, {
            where: { id: bookRecordId }
        })


        //You can send email when book is returned

        //Success message
        res.status(200).send({ message: "Book Returned." })

    } catch (error) {
        next(error)
    }
}