import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail";
import { client, sender } from "./mailtrap";

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const recipient = [{ email }];
    try {
        // Replace the placeholder with actual token
        const emailHtml = htmlContent.replace("{verificationToken}", verificationToken);
        
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html: emailHtml,
            category: 'Email Verification'
        });
        
    } catch (error) {
        console.error('Failed to send verification email:', error);
        // IMPORTANT: Don't throw error - let signup continue
        // throw new Error("Failed to send email verification")
    }
}

export const sendWelcomeEmail = async (email: string, name: string) => {
    const recipient = [{ email }];
    const htmlContent = generateWelcomeEmailHtml(name);
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Welcome to Food Swift',
            html: htmlContent,
            template_variables: {
                company_info_name: "Foodswift",
                name: name
            }
        });
        
    } catch (error) {
        console.error('Failed to send welcome email:', error);
        // Don't throw - not critical for signup
    }
}

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
    const recipient = [{ email }];
    const htmlContent = generatePasswordResetEmailHtml(resetURL);
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Reset your password',
            html: htmlContent,
            category: "Reset Password"
        });
       
    } catch (error) {
        console.error('Failed to send password reset email:', error);
        // For password reset, throwing is OK since it's critical
        throw new Error("Failed to send password reset email");
    }
}

export const sendResetSuccessEmail = async (email: string) => {
    const recipient = [{ email }];
    const htmlContent = generateResetSuccessEmailHtml();
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Password Reset Successfully',
            html: htmlContent,
            category: "Password Reset"
        });
        
    } catch (error) {
        console.error('Failed to send password reset success email:', error);
        // Don't throw - just a confirmation email
    }
}