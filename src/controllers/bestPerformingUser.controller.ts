import { Request, Response, NextFunction } from "express";
import BorrowRecord from "../models/Borrow.model";
import User from "../models/User.model";
import { fn, col } from "sequelize";

export const GetBestPerformingReaders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topReaders = await BorrowRecord.findAll({
      attributes: [
        "userId",
        [fn("COUNT", col("userId")), "borrowCount"]
      ],
      group: ["userId"],
      order: [[fn("COUNT", col("userId")), "DESC"]],
      include: [
        {
          model: User,
          as: "user", // make sure your association uses the `as: user`
          attributes: ["id", "name", "email"]
        }
      ],
      limit: 10 // optional top 10
    });

    res.status(200).json({
      success: true,
      message: "Best performing readers fetched successfully",
      data: topReaders
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
