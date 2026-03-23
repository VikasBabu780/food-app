import { transporter } from "./mail.config";
import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";

// Use your Gmail as sender
const FROM = `"FoodSwift" <${process.env.EMAIL_USER}>`;

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: FROM,
      to: email,
      subject: "Verify your email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
    });

    console.log(`Verification email sent to ${email}`);
  } catch (error: any) {
    console.error("endVerificationEmail failed:", error.message);
    throw new Error(error.message);
  }
};

export const sendWelcomeEmail = async (
  email: string,
  name: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: FROM,
      to: email,
      subject: "Welcome to Food Swift",
      html: generateWelcomeEmailHtml(name),
    });

    console.log(`Welcome email sent to ${email}`);
  } catch (error: any) {
    console.error(" sendWelcomeEmail failed:", error.message);
    throw new Error(error.message);
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: FROM,
      to: email,
      subject: "Reset your password",
      html: generatePasswordResetEmailHtml(resetURL),
    });

    console.log(`Password reset email sent to ${email}`);
  } catch (error: any) {
    console.error("sendPasswordResetEmail failed:", error.message);
    throw new Error(error.message);
  }
};

export const sendResetSuccessEmail = async (
  email: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: FROM,
      to: email,
      subject: "Password Reset Successfully",
      html: generateResetSuccessEmailHtml(),
    });

    console.log(`eset success email sent to ${email}`);
  } catch (error: any) {
    console.error(" sendResetSuccessEmail failed:", error.message);
    throw new Error(error.message);
  }
};