import { Response, Request, NextFunction } from "express";
import Book from "../models/Book.model";
export const FindAllBooks = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const allBooks = await Book.findAll()

        if (allBooks) {
            return res.status(200).send({ data: allBooks, meesage: "Data Fetched Succesfully" })
        }else{
            return res.status(400).send({ meesage: "Error in fetching All Books " })

        }

    } catch (error) {
        next(error)
    }
}