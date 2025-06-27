export const registerTemplate = (otp: string| number, username: string) => {
    const message = ``


    const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Your Account!</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="background-color: #4a90e2; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Welcome to BookBase!</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 10px;">
          Hey ${username},
        </p>
        <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 10px;">
          We're super excited to have you with us! To get your account up and running, here's your one-time password (OTP):
        </p>
        <p style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; background-color: #e7f3ff; color: #4a90e2; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 5px;">
            ${otp}
          </span>
        </p>
        <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 10px;">
          Pop this code into the verification field on our site to confirm your account. It’s good for 10 minutes, so don’t wait too long!
        </p>
        <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 10px;">
          For your security, keep this OTP to yourself. If you didn’t request this or run into any issues, hit us up at <a href="mailto:support@yourapp.com" style="color: #4a90e2; text-decoration: none;">support@yourapp.com</a>.
        </p>
        <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0;">
          Can’t wait to see you explore the app! 🚀
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f4f4f4; padding: 10px; text-align: center;">
        <p style="color: #666666; font-size: 12px; margin: 0;">
          &copy; 2025 YourApp. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    return emailTemplate
}