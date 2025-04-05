import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load credentials from .env

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // Your Gmail address
    pass: process.env.EMAIL_PASS,     // App password (not your real password)
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: `"EmailBot" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return false;
  }
};

export default sendEmail;
