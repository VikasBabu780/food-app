import nodemailer from "nodemailer";

let _transporter: nodemailer.Transporter | null = null;

export const getTransporter = async () => {
  if (_transporter) return _transporter;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER or EMAIL_PASS is missing");
  }

  _transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
  });

  //  REMOVE verify()
  return _transporter;
};