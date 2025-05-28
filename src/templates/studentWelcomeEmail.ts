export const studentWelcomeEmailTemplate = (
  studentName: string,
  mobileNumber: string,
  password: string,
  teacherName: string
) => {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to School Portal</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333333;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
    <tr>
      <td style="padding: 20px 0; text-align: center; background-color: #4a90e2;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Welcome to School Portal</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; background-color: #ffffff; border: 1px solid #e0e0e0;">
        <p style="margin: 0 0 20px 0;">Dear ${studentName},</p>
        
        <p style="margin: 0 0 20px 0;">Welcome to our school portal! Your student account has been successfully created.</p>
        
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5; border-radius: 5px; margin: 20px 0;">
          <tr>
            <td style="padding: 15px;">
              <h3 style="margin: 0 0 15px 0; color: #333333;">Your Login Details:</h3>
              <p style="margin: 0 0 10px 0;"><strong>Username:</strong> ${mobileNumber}</p>
              <p style="margin: 0;"><strong>Password:</strong> ${password}</p>
            </td>
          </tr>
        </table>
        
        <p style="margin: 0 0 20px 0;"><strong>Important:</strong> Please change your password after your first login to keep your account secure.</p>
        
        <p style="margin: 0 0 20px 0;">If you face any issues or have questions, feel free to contact the school administration.</p>
        
        <p style="margin: 0 0 20px 0;">Wishing you a great academic journey!</p>
        
        <p style="margin: 0;">Best regards,<br/>
        ${teacherName}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
        <p style="margin: 0; font-size: 12px; color: #666666;">
          School Administration<br/>
          Email: admin@school.com<br/>
          Phone: +91-12345-67890
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}; 