import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Iniciando prueba simple de Resend...');
    
    // Verificar API key
    const apiKey = process.env.RESEND_API_KEY;
    console.log('API Key configurada:', apiKey ? 'Sí' : 'No');
    console.log('API Key (primeros 10 chars):', apiKey ? apiKey.substring(0, 10) + '...' : 'No configurada');
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key no configurada' }, { status: 500 });
    }

    // Inicializar Resend
    const resend = new Resend(apiKey);
    console.log('✅ Resend inicializado');

    // Intentar enviar email simple
    console.log('📧 Enviando email de prueba...');
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'luis.espinoza.nav@outlook.com',
      subject: 'Test',
      html: '<p>Test email</p>'
    });

    console.log('✅ Resultado:', result);

    return NextResponse.json({
      success: true,
      message: 'Email enviado correctamente',
      result: result
    });

  } catch (error: any) {
    console.error('❌ Error completo:', error);
    console.error('❌ Mensaje de error:', error.message);
    console.error('❌ Stack trace:', error.stack);
    
    return NextResponse.json({
      error: 'Error en prueba',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
} 