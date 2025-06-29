import { Response, Request, NextFunction } from "express";
import Book from "../models/Book.model";


export const FindByISBN = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    console.log(req.body);
    if (!req.body || "isbn" in req.body == false) {
        return res.status(400).send({
            message: "Invalid or no payload passed."
        })
    }

    
    const { isbn } = req.body

    try {
        const foundBook = await Book.findOne({ where: { isbn: isbn } })

        if (!foundBook) {
            return res.status(400).send({ message: "Book with this ISBN not found" })
        }

        return res.status(200).send({ message: "Book Found ", data: foundBook })

    } catch (error) {
        next(error)
    }
}