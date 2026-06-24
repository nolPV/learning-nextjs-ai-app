import { Resend } from 'resend';
import { contactSchema } from '@/lib/validations/contact';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

type ApiResponse<T> = { success: true; data: T } | { success: false; error: string };

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: result.error.errors[0].message 
      });
    }

    const { name, email, message } = result.data;

    await resend.emails.send({
      from: 'Contact Form <form@yourdomain.com>',
      to: process.env.CONTACT_RECEIVER_EMAIL || 'admin@example.com',
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      reply_to: email,
    });

    return NextResponse.json({ success: true, data: { message: 'ส่งข้อความสำเร็จ' } });
  } catch (error) {
    console.error('[CONTACT_API]', error);
    return NextResponse.json({ 
      success: false, 
      error: 'เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง' 
    }, { status: 500 });
  }
}
