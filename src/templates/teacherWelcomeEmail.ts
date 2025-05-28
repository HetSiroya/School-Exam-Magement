export const teacherWelcomeEmailTemplate = (
  teacherName: string,
  mobileNumber: string,
  password: string,
  adminName: string
) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to the School Portal</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #f0f4f8;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4a90e2;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
    }
    .credentials {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
      border-left: 4px solid #4a90e2;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #666666;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4a90e2;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to the School Portal</h1>
    </div>
    <div class="content">
      <p>Dear <strong>${teacherName}</strong>,</p>

      <p>We are excited to have you join our school community! Your teacher account has been successfully created, and you can now access the School Portal.</p>

      <div class="credentials">
        <h3>Your Login Details:</h3>
        <p><strong>Username:</strong> ${mobileNumber}</p>
        <p><strong>Password:</strong> ${password}</p>
      </div>

      <p><strong>Important:</strong> For your security, please change your password after your first login.</p>

      <p>If you need any assistance or have questions, please don’t hesitate to contact the school administration. We are here to help!</p>

      <p>Wishing you a wonderful teaching experience!</p>

      <p>Best regards,<br>
      ${adminName}  
      <br>School Administration</p>
    </div>
    <div class="footer">
      <p>School Administration<br>
      Email: admin@school.com<br>
      Phone: +91-12345-67890</p>
    </div>
  </div>
</body>
</html>
`;
};
