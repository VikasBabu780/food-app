import nodemailer from "nodemailer";

let _transporter: nodemailer.Transporter | null = null;

export const getTransporter = async (): Promise<nodemailer.Transporter> => {
  if (_transporter) return _transporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error(
      `Missing email credentials — EMAIL_USER: ${!!user}, EMAIL_PASS: ${!!pass}`
    );
  }

  _transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",      // 👈 explicit host instead of service:"gmail"
    port: 465,                    // 👈 explicit port
    secure: true,                 // 👈 true for port 465
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: true,   // 👈 enforce valid certs in production
    },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });

  // Verify connection on startup so you catch credential errors early
  await _transporter.verify();
  console.log("✅ Mail transporter verified and ready");

  return _transporter;
};