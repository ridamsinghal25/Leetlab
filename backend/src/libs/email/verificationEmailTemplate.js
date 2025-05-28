export const verificationEmailTemplate = (fullName, verifyCode) => `
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
  <style>
    @font-face {
      font-family: "Roboto";
      src: url("https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
    }
    body {
      font-family: "Roboto", Verdana, sans-serif;
      background-color: #f4f4f7;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
    }
    .email-wrapper {
      width: 100%;
      background-color: #f4f4f7;
      padding: 20px;
    }
    .email-content {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #dddddd;
    }
    .email-body {
      padding: 20px;
    }
    .email-footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #dddddd;
      font-size: 0.9em;
      color: #888888;
    }
    .heading {
      font-size: 1.5em;
      font-weight: bold;
      color: #333333;
    }
    .text {
      font-size: 1em;
      color: #333333;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-content">
      <div class="email-header">
        <p>Here&apos; your Verification code ${verifyCode}</p>
      </div>
      <br/>
      <div class="email-body">
        <p class="text">Hello ${fullName},</p>
        <p class="text">Thank you for registering. Please use the following verification code to complete your registration:</p>
        <p class="heading">${verifyCode}</p>
        <p class="text">If you did not request this code, please ignore this email.</p>
      </div>
      <div class="email-footer">
        <p>Copyright © ${new Date().getFullYear()} LeetLab. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export function verificationPlainTextTemplate(fullName, verifyCode) {
  return `Hello ${fullName},
  
  Thank you for registering. Please use the following verification code to complete your registration:
  
  Verification Code: ${verifyCode}
  
  If you did not request this code, please ignore this email.
  
  Copyright © ${new Date().getFullYear()} LeetLab. All rights reserved.`;
}
