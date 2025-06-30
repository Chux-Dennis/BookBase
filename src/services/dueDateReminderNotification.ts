import BorrowRecord from "../models/Borrow.model";
import User from "../models/User.model";
import Book from "../models/Book.model";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cron from "node-cron";
import { reminderEmailTemplate } from "../email/reminderEmail";

dotenv.config();

const returnDuration = [7, 3, 2]

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASS,
  },
});

export const dueDateReminderHandler = async () => {
  console.log("[Reminder Job] Checking borrow records...");

  try {
    const today = new Date();

    const borrowings = await BorrowRecord.findAll({
      where: { status: "active" },
    });

    for (const record of borrowings) {
      const dueDate = new Date(record.dueDate as Date);
      const diffMs = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      const user = await User.findByPk(record.userId);
      const book = await Book.findByPk(record.bookId);

      console.log(`Book ID ${record.bookId} for ${user?.name} due in ${diffDays} days`);
      if ([...returnDuration].includes(diffDays)) {


        if (user?.email && book?.title) {
          const html = reminderEmailTemplate(diffDays, user.name, book.title);

          await transporter.sendMail({
            from: process.env.APP_EMAIL,
            to: user.email,
            subject: `📚 Reminder: Return "${book.title}" in ${diffDays} day(s)`,
            html,
          });

          console.log(`Sent reminder to ${user.email} for book "${book.title}" (due in ${diffDays} days)`);
        }
      }
    }
  } catch (error) {
    console.error("[Reminder Job] Error sending reminders: ", error);
  }
};

export const startDueDateReminderJob = () => {
  // runs every day at 10 AM
  cron.schedule("30 14 * * *", dueDateReminderHandler);
};
