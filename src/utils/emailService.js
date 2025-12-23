import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendReplyEmail = async ({ to, subject, message }) => {
  await transporter.sendMail({
    from: `"RozgarWala Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: message,
  });
};
