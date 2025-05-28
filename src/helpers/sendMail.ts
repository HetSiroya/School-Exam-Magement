import express from "express";
require("dotenv").config(); 
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  service: process.env.Service,
  host: process.env.Host,
  auth: {
    user: process.env.User,
    pass: process.env.Pass,
  },
  secure: true,
  port: process.env.Email_Port,
} as SMTPTransport.Options);

const sendEmail = async (to: string, subject: string, message: string) => {
  try {
    const mailOptions = {
      from: process.env.User,
      to,
      subject,
      html: message,
      text: message.replace(/<[^>]*>/g, ''),
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
