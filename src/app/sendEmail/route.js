import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
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

    const mailData = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: body.email,
      subject: body.task,
      text: body.desc,
    };

    await transporter.sendMail(mailData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}