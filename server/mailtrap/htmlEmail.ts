export const htmlContent: string = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Email Verification</title>

<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #f2f4f6;
    font-family: Arial, Helvetica, sans-serif;
  }

  .wrapper {
    width: 100%;
    padding: 30px 15px;
  }

  .container {
    max-width: 600px;
    margin: auto;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .header {
    background: #ff7a00;
    padding: 25px;
    text-align: center;
    color: white;
  }

  .header h1 {
    margin: 0;
    font-size: 24px;
  }

  .content {
    padding: 30px;
    text-align: center;
  }

  .content h2 {
    margin-top: 0;
    color: #333;
  }

  .content p {
    color: #555;
    font-size: 15px;
    line-height: 1.6;
  }

  .code {
    display: inline-block;
    margin: 25px 0;
    padding: 12px 28px;
    font-size: 26px;
    letter-spacing: 4px;
    font-weight: bold;
    background: #fff4e6;
    border-radius: 8px;
    color: #ff7a00;
  }

  .footer {
    padding: 20px;
    font-size: 13px;
    text-align: center;
    color: #999;
    background: #fafafa;
  }
</style>
</head>

<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>Email Verification</h1>
      </div>

      <div class="content">
        <h2>Hello 👋</h2>
        <p>Thanks for signing up! Please use the verification code below to complete your registration.</p>

        <div class="code">{verificationToken}</div>

        <p>If you didn’t request this, you can safely ignore this email.</p>
      </div>

      <div class="footer">
        © 2024 Your Company. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
`;

export const generateWelcomeEmailHtml = (name: string) => {
  return `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
  body {
    margin: 0;
    padding: 0;
    background: #f2f4f6;
    font-family: Arial, Helvetica, sans-serif;
  }

  .container {
    max-width: 600px;
    margin: 30px auto;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .header {
    background: #ff7a00;
    color: white;
    text-align: center;
    padding: 25px;
  }

  .body {
    padding: 30px;
    color: #444;
    line-height: 1.6;
  }

  .footer {
    text-align: center;
    padding: 18px;
    font-size: 13px;
    background: #fafafa;
    color: #999;
  }
</style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Patel Food 🍽️</h1>
    </div>

    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your email has been successfully verified. We're excited to have you with us!</p>
      <p>Start exploring delicious meals and amazing restaurants on Patel Food.</p>
      <p>If you need any help, we’re always here for you.</p>
      <p><strong>The Patel Food Team</strong></p>
    </div>

    <div class="footer">
      © 2024 Patel Food. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
};

export const generatePasswordResetEmailHtml = (resetURL: string) => {
  return `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
  body {
    margin: 0;
    padding: 0;
    background: #f2f4f6;
    font-family: Arial, Helvetica, sans-serif;
  }

  .container {
    max-width: 600px;
    margin: 30px auto;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .header {
    background: #ff4d4f;
    color: white;
    padding: 25px;
    text-align: center;
  }

  .body {
    padding: 30px;
    color: #444;
    line-height: 1.6;
    text-align: center;
  }

  .button {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 24px;
    background: #ff7a00;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
  }

  .footer {
    text-align: center;
    padding: 18px;
    font-size: 13px;
    background: #fafafa;
    color: #999;
  }
</style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset</h1>
    </div>

    <div class="body">
      <p>We received a request to reset your password.</p>
      <p>Click below to continue:</p>

      <a href="${resetURL}" class="button">Reset Password</a>

      <p>If you didn’t request this, ignore this email.</p>
      <p><strong>Patel Food Team</strong></p>
    </div>

    <div class="footer">
      © 2024 Patel Food. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
};

export const generateResetSuccessEmailHtml = () => {
  return `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
  body {
    margin: 0;
    padding: 0;
    background: #f2f4f6;
    font-family: Arial, Helvetica, sans-serif;
  }

  .container {
    max-width: 600px;
    margin: 30px auto;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .header {
    background: #28a745;
    color: white;
    padding: 25px;
    text-align: center;
  }

  .body {
    padding: 30px;
    color: #444;
    line-height: 1.6;
  }

  .footer {
    text-align: center;
    padding: 18px;
    font-size: 13px;
    background: #fafafa;
    color: #999;
  }
</style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Password Updated ✅</h1>
    </div>

    <div class="body">
      <p>Your password has been successfully reset.</p>
      <p>You can now log in using your new password.</p>
      <p>If this wasn’t you, please contact support immediately.</p>
      <p><strong>Patel Food Team</strong></p>
    </div>

    <div class="footer">
      © 2024 Patel Food. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
};
