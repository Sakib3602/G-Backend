import type { Request, Response } from "express";
import nodemailer from 'nodemailer';

interface LeadInfo {
  leadId?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
}

interface EmailRequestBody {
  to: string;
  subject: string;
  message: string;
  proposalLink: string;
  leadInfo: LeadInfo;
}


// proposal send emaail
export const sendLeadProposalEmail = async (req: Request, res: Response) => {
  try {
    console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
    const { to, subject, message, proposalLink, leadInfo }: EmailRequestBody = req.body;

    console.log('Received email send request:', { to, subject, message, proposalLink, leadInfo });


    const transporter = nodemailer.createTransport({
      secure: true,
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const proposalButton = (proposalLink && proposalLink.trim() !== "") 
      ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${proposalLink}" 
             style="background-color: #1a73e8; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
             View Proposal
          </a>
        </div>
      ` 
      : "";


    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #333;">${subject}</h2>
        <p>Hi <strong>${leadInfo.name}</strong>,</p>
        <p style="white-space: pre-line;">${message}</p>
        
        ${proposalButton}

        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
          <p><strong>Company:</strong> ${leadInfo.company}</p>
          <p><strong>Phone:</strong> ${leadInfo.phone}</p>
        </div>
      </div>
    `;

    // send mail
    const mailOptions = {
      from: `"Your Name" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);

    // ৬. (ঐচ্ছিক) Mongoose এ সেভ করা
    // await EmailModel.create({ ...req.body, messageId: info.messageId });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId
    });

  } catch (error: any) {
    console.error('Email Sending Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

// Remailder Send EMail
export const sendRemainderEmail = async (req: Request, res: Response) => {
  try {
    
    const {email} = req.params as { email: string };

    console.log('Received reminder email send request for:', email);
    


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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
  <h2 style="color: #333;">Friendly Reminder</h2>
  <p>Dear Valued Client,</p>
  
  <p>This is a friendly reminder from <strong>Genesys</strong>. Please take a moment to review any pending items or follow-ups at your convenience.</p>
  
  <p>If you have any questions or need assistance, our team is always here to help.</p>
  
  <p>Thank you for your time and continued trust in <strong>Genesys</strong>.</p>
  
  <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
    <p><strong>Genesys Team</strong></p>
    <p>Email: info@genesys.com | Phone: +880-XXXX-XXXXXX</p>
  </div>
</div>
    `;

    // send mail
    const mailOptions = {
      from: `"Your Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Friendly Reminder from Genesys",
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);

    // ৬. (ঐচ্ছিক) Mongoose এ সেভ করা
    // await EmailModel.create({ ...req.body, messageId: info.messageId });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId
    });

  } catch (error: any) {
    console.error('Email Sending Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};