import { Request, Response, NextFunction } from "express";
import Book from "../models/Book.model";
import BookInventory from "../models/BookInventory.model";
import { validateAddBookCopies } from "../validations/addBookCopies.validate";
import User from "../models/User.model";

export const AddBookCopies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;


    const { amount, transactionType } = req.body;
    let userId = (req as any).user.id;
   

    const { error } = validateAddBookCopies.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User with ID not found", });

    }

    // handle initial stock setup if book is fresh
    if (transactionType === "entry" && book.copiesTotal === 0) {
      book.copiesTotal = amount;
      book.copiesAvailable = amount;
      await book.save();

      await BookInventory.create({
        bookId: book.id,
        userId,
        transactionType,
        adjustment: amount,
        comment: `Initial stock added by user ${user.name}`,
      });

      return res.json({
        success: true,
        user_name: user.name,
        message: `Initial stock of ${amount} copies added successfully.`,
        data: book,
      });
    }

    let adjustmentAmount = amount;

    if (transactionType === "removal") {
      adjustmentAmount = -Math.abs(amount);
    }

    const newTotal = book.copiesTotal + adjustmentAmount;
    const newAvailable = book.copiesAvailable + adjustmentAmount;

    if (newTotal < 0 || newAvailable < 0) {
      return res.status(400).json({
        success: false,
        message: "Operation would result in negative book inventory.",
      });
    }

    book.copiesTotal = newTotal;
    book.copiesAvailable = newAvailable;

    await book.save();

    await BookInventory.create({
      bookId: book.id,
      userId,
      transactionType,
      adjustment: Math.abs(amount),
      comment: `Stock ${transactionType} by user ${user.name}`,
    });

    return res.json({
      success: true,
      user_name: user.name,
      message: `Stock ${transactionType} of ${amount} copies applied successfully.`,
      data: book,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
