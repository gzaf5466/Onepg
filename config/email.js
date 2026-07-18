import nodemailer from 'nodemailer';

// AWS SES / SMTP Transporter configuration
const createTransporter = () => {
  if (process.env.AWS_SES_SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.AWS_SES_SMTP_HOST, // e.g., email-smtp.us-east-1.amazonaws.com
      port: process.env.AWS_SES_SMTP_PORT || 465,
      secure: true,
      auth: {
        user: process.env.AWS_SES_SMTP_USER,
        pass: process.env.AWS_SES_SMTP_PASS
      }
    });
  }

  // Fallback to standard SMTP if set
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  return null;
};

export const sendOtpEmail = async (toEmail, otpCode) => {
  const transporter = createTransporter();

  const fromEmail = process.env.AWS_SES_FROM_EMAIL || process.env.SENDER_EMAIL || 'no-reply@onepg.co.in';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #050505; color: #ffffff; padding: 40px; border-radius: 16px; max-width: 500px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.1);">
      <h2 style="color: #FF5722; margin-bottom: 8px;">OnePG Technologies</h2>
      <p style="font-size: 14px; color: #9CA3AF;">Password Recovery Verification Code</p>
      <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
      
      <p style="font-size: 14px; color: #d1d5db;">You recently requested to reset your password for your OnePG merchant account. Use the 4-digit verification code below to complete the reset:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #00E5FF; background: rgba(0, 229, 255, 0.1); padding: 12px 24px; border-radius: 12px; border: 1px solid rgba(0, 229, 255, 0.3);">
          ${otpCode}
        </span>
      </div>

      <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">
        This code is valid for 15 minutes. If you did not request a password reset, please ignore this email or contact security support.
      </p>
      <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;" />
      <p style="font-size: 10px; color: #4b5563; text-align: center;">
        © 2025 OnePG Technologies Pvt. Ltd. All rights reserved.
      </p>
    </div>
  `;

  if (!transporter) {
    console.log(`\n==============================================`);
    console.log(`[AWS SES DEV MODE] OTP Code for ${toEmail}: [ ${otpCode} ]`);
    console.log(`==============================================\n`);
    return { success: true, mode: 'dev' };
  }

  try {
    await transporter.sendMail({
      from: `"OnePG Security" <${fromEmail}>`,
      to: toEmail,
      subject: 'Your OnePG Password Recovery Code',
      html: htmlContent
    });
    console.log(`✅ [AWS SES] Password reset OTP sent to ${toEmail}`);
    return { success: true, mode: 'aws-ses' };
  } catch (err) {
    console.error('❌ [AWS SES Email Error]:', err.message);
    throw err;
  }
};
