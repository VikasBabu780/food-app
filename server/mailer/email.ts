import { getTransporter } from "./mail.config";
import { 
  generatePasswordResetEmailHtml, 
  generateResetSuccessEmailHtml, 
  generateWelcomeEmailHtml, 
  htmlContent 
} from "./htmlEmail";


export const sendVerificationEmail = async (email: string, verificationToken: string): Promise<void> => {
  try {
    const transporter = await getTransporter();
    const emailHtml = htmlContent.replace("{verificationToken}", verificationToken);

    const res = await transporter.sendMail({              
      from: `"FoodSwift" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email",
      text: `Your OTP is ${verificationToken}`,
      html: emailHtml,
    });
  } catch (error) {
    console.error("FULL EMAIL ERROR:", error);  //  see exact error
    throw error;
  }
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
  try {
    const transporter = await getTransporter();
    const res = await transporter.sendMail({
      from: `"FoodSwift" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Food Swift",
      html: generateWelcomeEmailHtml(name),
    });
  //  console.log("Welcome email sent:", res.response);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email: string, resetURL: string): Promise<void> => {
  try {
    const transporter = await getTransporter();
    const res = await transporter.sendMail({
      from: `"FoodSwift" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: generatePasswordResetEmailHtml(resetURL),
    });
    // console.log("Password reset email sent:", res.response);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
};

export const sendResetSuccessEmail = async (email: string): Promise<void> => {
  try {
    const transporter = await getTransporter();
    const res = await transporter.sendMail({
      from: `"FoodSwift" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Successfully",
      html: generateResetSuccessEmailHtml(),
    });
    // console.log("Reset success email sent:", res.response);
  } catch (error) {
    console.error("Failed to send reset success email:", error);
    throw error;
  }
};