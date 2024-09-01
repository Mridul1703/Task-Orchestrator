import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();

    // Validate input
    if (!body.email || !body.task || !body.desc) {
      throw new Error("Missing required fields");
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Prepare email data
    const mailData = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: body.email,
      subject: body.task,
      text: body.desc,
    };

    // Send email
    const info = await transporter.sendMail(mailData);

    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId 
    });

  } catch (error) {
    console.error("Error sending email:", error.message);
    
    // Log the full stack trace for debugging
    console.trace(error.stack);

    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : String(error),
        statusCode: error instanceof Error ? 400 : 500
      },
      { status: error instanceof Error ? 400 : 500 }
    );
  }
}
