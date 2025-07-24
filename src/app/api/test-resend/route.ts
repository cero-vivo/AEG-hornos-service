import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  try {

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { 
          error: 'RESEND_API_KEY no está configurado',
          config: {
            hasApiKey: false
          }
        },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['luis.espinoza.nav@outlook.com'],
      subject: 'Prueba de conexión - AEG Hornos',
      html: `
        <h2>Prueba de conexión exitosa</h2>
        <p>Este es un email de prueba para verificar que Resend está configurado correctamente.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <hr>
        <p><em>Si recibes este email, la configuración de Resend es correcta.</em></p>
      `
    });

    if (error) {
      return NextResponse.json(
        { 
          error: 'Error al enviar email de prueba',
          details: error.message,
          config: {
            hasApiKey: true,
            timestamp: new Date().toISOString()
          }
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Email de prueba enviado correctamente',
        config: {
          hasApiKey: true,
          timestamp: new Date().toISOString()
        },
        data: data
      },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Error al enviar email de prueba',
        details: error.message || 'Error desconocido',
        config: {
          hasApiKey: !!process.env.RESEND_API_KEY
        }
      },
      { status: 500 }
    );
  }
} 