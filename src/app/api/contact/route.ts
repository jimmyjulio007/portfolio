import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getContactFormSchema, type Locale } from "@/shared/lib/validations/contact";
import { generateEmailHTML } from "@/shared/lib/email-templates";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const locale = (body.locale as Locale) || "en";

        // Validate with Zod using locale-specific messages
        const validationResult = getContactFormSchema(locale).safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: validationResult.error.message,
                },
                { status: 400 }
            );
        }

        const { name, email, message } = validationResult.data;

        // Generate email HTML
        const { subject, html } = generateEmailHTML(locale, name, email, message);

        // Create transporter with correct environment variable names
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT || "587"),
            secure: process.env.MAIL_PORT === "465", // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // Send email
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_USER, // Send to your own email
            replyTo: email,
            subject,
            html,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Message sent successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            {
                error: "Failed to send message",
                message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
