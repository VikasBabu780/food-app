import { getTransporter } from "./mail.config";
import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";

const FROM = `"FoodSwift" <${process.env.EMAIL_USER}>`;

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  try {
    const transporter = await getTransporter();
    const emailHtml = htmlContent.replace("{verificationToken}", verificationToken);

    const res = await transporter.sendMail({
      from: FROM,
      to: email,
      subject: "Verify your email",
      text: `Your OTP is ${verificationToken}`,
      html: emailHtml,
    });

    console.log(`✅ Verification email sent to ${email}:`, res.response);

    // If any address was rejected by Gmail
    if (res.rejected.length > 0) {
      console.error("❌ Rejected addresses:", res.rejected);
      throw new Error(`Email rejected for: ${res.rejected.join(", ")}`);
    }
  } catch (error) {
    console.error("❌ sendVerificationEmail failed:", error);
    throw error;
  }
};

export const sendWelcomeEmail = async (
  email: string,
  name: string
): Promise<void> => {
  try {
    const transporter = await getTransporter();

    const res = await transporter.sendMail({
      from: FROM,
      to: email,
      subject: "Welcome to Food Swift",
      html: generateWelcomeEmailHtml(name),
    });

    console.log(`✅ Welcome email sent to ${email}:`, res.response);
  } catch (error) {
    console.error("❌ sendWelcomeEmail failed:", error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
): Promise<void> => {
  try {
    const transporter = await getTransporter();

    const res = await transporter.sendMail({
      from: FROM,
      to: email,
      subject: "Reset your password",
      html: generatePasswordResetEmailHtml(resetURL),
    });

    console.log(`✅ Password reset email sent to ${email}:`, res.response);
  } catch (error) {
    console.error("❌ sendPasswordResetEmail failed:", error);
    throw error;
  }
};

export const sendResetSuccessEmail = async (email: string): Promise<void> => {
  try {
    const transporter = await getTransporter();

    const res = await transporter.sendMail({
      from: FROM,
      to: email,
      subject: "Password Reset Successfully",
      html: generateResetSuccessEmailHtml(),
    });

    console.log(`✅ Reset success email sent to ${email}:`, res.response);
  } catch (error) {
    console.error("❌ sendResetSuccessEmail failed:", error);
    throw error;
  }
};
