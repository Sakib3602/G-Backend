import type { Request, Response } from "express";
import nodemailer from 'nodemailer';


export const sendEmailForRemaiderToSign = async (req: Request, res: Response) => {
  try {
    const { email } = req.params as { email: string };
    console.log('Email parameter:', email);
    const { signLink, name } = req.body as { signLink: string; name: string };

  

    if (!email || !signLink || !name) {
      return res.status(400).json({
        success: false,
        message: "email, name and signLink are required",
      });
    }

    const transporter = nodemailer.createTransport({
      secure: true,
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlBody = `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 24px; border: 1px solid #e5e7eb;">
      <h2 style="font-size: 22px; font-weight: bold; color: #111827; margin-bottom: 16px;">
        Friendly Reminder
      </h2>

      <p style="color: #374151; margin-bottom: 12px;">
        Dear ${name},
      </p>

      <p style="color: #4b5563; margin-bottom: 16px; line-height: 1.6;">
        This is a friendly reminder to kindly review and sign your document so that we can proceed with the next steps.
      </p>

      <div style="text-align: center; margin: 20px 0;">
        <a href="${signLink}"
           style="background-color: #d4af37; color: #ffffff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">
          Sign Document
        </a>
      </div>

      <p style="color: #4b5563; margin-bottom: 16px; line-height: 1.6;">
        If you need any additional information or assistance, please feel free to contact us. We are always here to help.
      </p>

      <p style="color: #374151; margin-bottom: 20px;">
        Thank you for your time and cooperation.
      </p>

      <p style="color: #111827;">
        Best regards,<br/>
        <strong>Genesys Team</strong>
      </p>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
        <p>Email: info@genesys.com</p>
        <p>Phone: +880-XXXX-XXXXXX</p>
      </div>
    </div>
  </div>
`;

    const mailOptions = {
      from: `"Genesys Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Friendly Reminder from Genesys",
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error('Email Sending Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: message,
    });
  }
};