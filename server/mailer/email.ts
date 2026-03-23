import { resend } from "./mail.config";
import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";

// For testing: "onboarding@resend.dev"
// For production with your domain: "noreply@yourdomain.com"
const FROM = "FoodSwift <onboarding@resend.dev>";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Verify your email",
    html: htmlContent.replace("{verificationToken}", verificationToken),
  });

  if (error) {
    console.error("❌ sendVerificationEmail failed:", error);
    throw new Error(error.message);
  }

  console.log(`✅ Verification email sent to ${email}`);
};

export const sendWelcomeEmail = async (
  email: string,
  name: string
): Promise<void> => {
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Welcome to Food Swift",
    html: generateWelcomeEmailHtml(name),
  });

  if (error) {
    console.error("❌ sendWelcomeEmail failed:", error);
    throw new Error(error.message);
  }

  console.log(`✅ Welcome email sent to ${email}`);
};

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
): Promise<void> => {
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Reset your password",
    html: generatePasswordResetEmailHtml(resetURL),
  });

  if (error) {
    console.error("❌ sendPasswordResetEmail failed:", error);
    throw new Error(error.message);
  }

  console.log(`✅ Password reset email sent to ${email}`);
};

export const sendResetSuccessEmail = async (email: string): Promise<void> => {
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Password Reset Successfully",
    html: generateResetSuccessEmailHtml(),
  });

  if (error) {
    console.error("❌ sendResetSuccessEmail failed:", error);
    throw new Error(error.message);
  }

  console.log(`✅ Reset success email sent to ${email}`);
};