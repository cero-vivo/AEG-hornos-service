import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customers, subject, html } = body;

    if (!customers || !Array.isArray(customers) || customers.length === 0) {
      return NextResponse.json(
        { error: 'Se requieren destinatarios' },
        { status: 400 }
      );
    }

    if (!subject || !html) {
      return NextResponse.json(
        { error: 'Se requieren asunto y contenido' },
        { status: 400 }
      );
    }

    const from = process.env.RESEND_FROM_DOMAIN || 'contacto@aeghornos.com.ar';
    console.log("🚀 ~ POST ~ from:", from)
    let successCount = 0;
    const errors = [];

    // Enviar emails individualmente para mejor control
    for (const customer of customers) {
      try {
        const personalizedHtml = html
          .replace(/{{name}}/g, customer.name || 'Cliente')
          .replace(/{{email}}/g, customer.email);

        const data = await resend.emails.send({
          from,
          to: [customer.email],
          subject,
          html: personalizedHtml,
        });

        if (data.error) {
          errors.push({ email: customer.email, error: data.error.message });
        } else {
          successCount++;
        }
      } catch (error) {
        errors.push({ 
          email: customer.email, 
          error: error instanceof Error ? error.message : 'Error desconocido' 
        });
      }
    }

    return NextResponse.json({
      success: successCount,
      total: customers.length,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}