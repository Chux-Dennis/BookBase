import { Request, Response, NextFunction } from "express";
import BorrowRecord from "../models/Borrow.model";
import Book from "../models/Book.model";
export const GetUserBorrowedBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = (req as any).user.id;

  try {
    const foundRecords = await BorrowRecord.findAll({
      where: { userId },
      include: [
        {
          model: Book,
          as: "book", 
        },
      ],
    });

    if (!foundRecords) {
      res.status(404).send({ message: "User has not borrowed any books" });
      return;
    }

    res.status(200).send({
      message: "All books borrowed by user fetched successfully",
      data: foundRecords,
    });
  } catch (error) {
    next(error);
  }
};
