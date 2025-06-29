import { Response, Request, NextFunction } from "express";
import Book from "../models/Book.model";


export const FindByGenre = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    console.log(req.body);
    if (!req.body || "genre" in req.body == false) {
        return res.status(400).send({
            message: "Invalid or no payload passed."
        })
    }

    
    const { genre } = req.body

    try {
        const foundBook = await Book.findAll({ where: { genre: genre } })

        if (!foundBook) {
            return res.status(400).send({ message: "Books with this Genre not found" })
        }

        return res.status(200).send({ message: "Book Found ", data: foundBook })

    } catch (error) {
        next(error)
    }
}