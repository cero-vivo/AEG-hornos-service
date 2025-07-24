import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key no configurada' }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'luis.espinoza.nav@outlook.com',
      subject: 'Test',
      html: '<p>Test email</p>'
    });

    return NextResponse.json({
      success: true,
      message: 'Email enviado correctamente',
      result: result
    });

  } catch (error: any) {
    return NextResponse.json({
      error: 'Error en prueba',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
} 