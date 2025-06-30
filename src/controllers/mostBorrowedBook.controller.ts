import { Request, Response, NextFunction } from "express";
import BorrowRecord from "../models/Borrow.model";
import Book from "../models/Book.model";
import { Op, fn, col } from "sequelize";
import { validateMostBorrow } from "../validations/mostBorrowed.validate";

export const GetMostBorrowedBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { startDate, endDate } = req.query;

        if (!req.body || Object.keys(req.query).length === 0) {
            res.status(400).json({ message: "No payload provided." });
        }
        // Validate properly
        const { error } = validateMostBorrow.validate(req.query);
        if (error) {
            res.status(400).json({ success: false, message: error.details[0].message });
            return;
        }

        // handle end of day
        const start = new Date(startDate as string);
        const end = new Date(endDate as string);
        end.setHours(23, 59, 59, 999);

        const borrowCounts = await BorrowRecord.findAll({
            where: {
                borrowDate: {
                    [Op.between]: [new Date(startDate as string), new Date(endDate as string)],
                },
            },
            attributes: [
                "bookId",
                [fn("COUNT", col("bookId")), "borrowCount"],
            ],
            group: ["bookId"],   // fix here!
            order: [[fn("COUNT", col("bookId")), "DESC"]],
            include: [
                {
                    model: Book,
                    as: "book",
                },
            ],
        });


        res.status(200).json({
            success: true,
            message: `Most borrowed books from ${startDate} to ${endDate}`,
            data: borrowCounts,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};



