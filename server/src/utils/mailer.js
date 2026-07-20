import nodemailer from "nodemailer";

const getTransporter = () => {
  const host = process.env.SMTP_HOST || "email-smtp.us-east-1.amazonaws.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const sendSignupOtpEmail = async (email, otp, name = "Merchant") => {
  const from = process.env.EMAIL_FROM || '"OnePG Support" <support@onepg.co.in>';
  const transporter = getTransporter();

  console.log(`[MAILER] Signup OTP for ${email}: ${otp}`);

  if (!transporter) {
    console.warn("[MAILER] SMTP credentials missing, OTP logged to console above.");
    return true;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #050505; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 540px; margin: 30px auto; background-color: #0b0c10; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 40px 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .logo { text-align: center; margin-bottom: 24px; }
        .logo span { font-size: 26px; font-weight: 800; color: #FF5722; letter-spacing: -0.5px; }
        .title { font-size: 20px; font-weight: 700; color: #ffffff; text-align: center; margin-bottom: 8px; }
        .subtitle { font-size: 13px; color: #9ca3af; text-align: center; margin-bottom: 28px; line-height: 1.5; }
        .otp-box { background: rgba(255, 87, 34, 0.08); border: 1px solid rgba(255, 87, 34, 0.3); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 28px; }
        .otp-code { font-size: 36px; font-weight: 800; color: #FF5722; letter-spacing: 8px; font-family: monospace; }
        .footer { font-size: 11px; color: #6b7280; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); pt: 20px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <span>OnePG</span>
        </div>
        <div class="title">Verify Your Merchant Email</div>
        <div class="subtitle">Welcome to OnePG, ${name}! Please enter the verification code below to complete your registration.</div>
        <div class="otp-box">
          <div class="otp-code">${otp}</div>
        </div>
        <div class="subtitle" style="font-size: 12px;">This verification code will expire in <strong>10 minutes</strong>. If you did not request this, please ignore this email.</div>
        <div class="footer">
          &copy; 2025 OnePG Technologies Pvt. Ltd. All rights reserved.<br/>
          Simplifying Payments, Powering Growth.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from,
      to: email,
      subject: `${otp} is your OnePG Verification Code`,
      html,
    });
    return true;
  } catch (err) {
    console.error("[MAILER] Error sending signup OTP email:", err);
    return false;
  }
};

export const sendPasswordResetOtpEmail = async (email, otp) => {
  const from = process.env.EMAIL_FROM || '"OnePG Support" <support@onepg.co.in>';
  const transporter = getTransporter();

  console.log(`[MAILER] Password Reset OTP for ${email}: ${otp}`);

  if (!transporter) {
    console.warn("[MAILER] SMTP credentials missing, OTP logged to console above.");
    return true;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #050505; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 540px; margin: 30px auto; background-color: #0b0c10; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 40px 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .logo { text-align: center; margin-bottom: 24px; }
        .logo span { font-size: 26px; font-weight: 800; color: #FF5722; letter-spacing: -0.5px; }
        .title { font-size: 20px; font-weight: 700; color: #ffffff; text-align: center; margin-bottom: 8px; }
        .subtitle { font-size: 13px; color: #9ca3af; text-align: center; margin-bottom: 28px; line-height: 1.5; }
        .otp-box { background: rgba(0, 229, 255, 0.08); border: 1px solid rgba(0, 229, 255, 0.3); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 28px; }
        .otp-code { font-size: 36px; font-weight: 800; color: #00E5FF; letter-spacing: 8px; font-family: monospace; }
        .footer { font-size: 11px; color: #6b7280; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); pt: 20px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <span>OnePG</span>
        </div>
        <div class="title">Reset Your OnePG Password</div>
        <div class="subtitle">Use the verification code below to complete your password recovery request.</div>
        <div class="otp-box">
          <div class="otp-code">${otp}</div>
        </div>
        <div class="subtitle" style="font-size: 12px;">This code will expire in <strong>10 minutes</strong>. Do not share this code with anyone.</div>
        <div class="footer">
          &copy; 2025 OnePG Technologies Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from,
      to: email,
      subject: `${otp} is your OnePG Password Reset Code`,
      html,
    });
    return true;
  } catch (err) {
    console.error("[MAILER] Error sending password reset OTP email:", err);
    return false;
  }
};
