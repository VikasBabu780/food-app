import nodemailer from "nodemailer";

let _transporter: nodemailer.Transporter | null = null;

export const getTransporter = async () => {
  if (_transporter) return _transporter;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(" EMAIL_USER or EMAIL_PASS is missing in .env");
  }

  _transporter = nodemailer.createTransport({
  service: "gmail",   //  simpler & safer
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
  logger: true,
});
  // ERIFY CONNECTION (VERY IMPORTANT)
  try {
    await _transporter.verify();
    console.log(" Email server is ready");
  } catch (err) {
    console.error(" Transporter verification failed:", err);
    throw err;
  }

  return _transporter;
};