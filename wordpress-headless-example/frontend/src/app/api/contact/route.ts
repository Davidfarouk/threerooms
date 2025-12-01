import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Email configuration
        const toEmail = 'info@theroomspoundbury.co.uk';
        const subject = `New Contact Form Submission from ${name}`;
        
        // Format email body
        const emailBody = `
New contact form submission from The Rooms Poundbury website:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
This email was sent from the contact form on https://www.theroomspoundbury.co.uk
Sent at: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
        `.trim();

        // Send email using Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        
        if (!resendApiKey) {
            // Fallback: Log to console if API key is not set (for development)
            console.log('Contact form submission (RESEND_API_KEY not set):', {
                to: toEmail,
                subject,
                body: emailBody,
            });
            
            // In development, still return success so form works
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json(
                    { 
                        success: true, 
                        message: 'Thank you! Your message has been logged. (Email service not configured - set RESEND_API_KEY in .env.local)' 
                    },
                    { status: 200 }
                );
            }
            
            // In production, return error if API key is missing
            return NextResponse.json(
                { error: 'Email service is not configured. Please contact the administrator.' },
                { status: 500 }
            );
        }

        try {
            const resend = new Resend(resendApiKey);
            
            // Use onboarding email if domain not verified, otherwise use custom domain
            // If domain is verified in Resend, change to: 'The Rooms Poundbury <noreply@theroomspoundbury.co.uk>'
            const fromEmail = 'onboarding@resend.dev';
            
            const { data, error } = await resend.emails.send({
                from: fromEmail,
                to: [toEmail],
                subject: subject,
                text: emailBody,
                replyTo: email,
            });
            

            if (error) {
                console.error('Resend error:', error);
                return NextResponse.json(
                    { error: 'Failed to send email. Please try again later.' },
                    { status: 500 }
                );
            }

            console.log('Email sent successfully:', data);
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            return NextResponse.json(
                { error: 'An error occurred while sending your message. Please try again later.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                success: true, 
                message: 'Thank you! Your message has been sent. We will get back to you soon.' 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'An error occurred while sending your message. Please try again later.' },
            { status: 500 }
        );
    }
}

