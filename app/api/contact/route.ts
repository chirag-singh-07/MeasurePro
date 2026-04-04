import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormData = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate message length
    if (body.message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Save the contact message to a database
    // 2. Send an email notification to the admin
    // 3. Send a confirmation email to the user
    
    // For now, we'll just log and return success
    const timestamp = new Date().toISOString();
    console.log(`[Contact Form] ${timestamp}`, {
      name: body.name,
      email: body.email,
      company: body.company || 'Not provided',
      subject: body.subject,
      message: body.message.substring(0, 100) + '...'
    });

    // TODO: Implement email sending via:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Nodemailer

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        timestamp
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact Form Error]', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
