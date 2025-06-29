import { Request, Response, NextFunction } from "express";
import Book from "../models/Book.model";

export const DeleteBook = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    try {
        const { id } = req.params;

        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        await book.destroy(); 

        res.json({
            success: true,
            message: "Book deleted succesfully",
        });
    } catch (err) {
        next(err);
    }

}