export const reminderEmailTemplate = (
  numberOfDays: number,
  username: string,
  bookName: string
) => {
  let reminderMessage = "";

  if (numberOfDays === 7) {
    reminderMessage = `You have 7 days left to return your borrowed book <strong>${bookName}</strong>. Please make sure to return it on or before the due date to avoid penalties.`;
  } else if (numberOfDays === 3) {
    reminderMessage = `Just a heads-up! You have only 3 days left to return <strong>${bookName}</strong>. Please plan to bring it back soon.`;
  } else if (numberOfDays === 1) {
    reminderMessage = `⚠️ This is your final reminder: you have just 1 day left to return <strong>${bookName}</strong>. Please ensure you return it by tomorrow to avoid overdue fees.`;
  } else {
    reminderMessage = `This is a reminder about your borrowed book <strong>${bookName}</strong>. Please check your due date and return it on time.`;
  }

  const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Book Return Reminder</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="background-color: #4a90e2; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">BookBase Reminder</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">
          Hi ${username},
        </p>
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">
          ${reminderMessage}
        </p>
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">
          If you have already returned your book, kindly ignore this message. Otherwise, we look forward to seeing you return it on time!
        </p>
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">
          If you have any questions, reach out to us at <a href="mailto:support@bookbase.com" style="color: #4a90e2; text-decoration: none;">support@bookbase.com</a>.
        </p>
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">
          Thank you for using BookBase! 📚
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f4f4f4; padding: 10px; text-align: center;">
        <p style="color: #666666; font-size: 12px; margin: 0;">
          &copy; 2025 BookBase. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return emailTemplate;
};
