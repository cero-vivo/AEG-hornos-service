import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  // Solo permitir en modo desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { 
        error: 'Esta ruta solo está disponible en modo desarrollo',
        config: {
          hasApiKey: false,
          environment: process.env.NODE_ENV
        }
      },
      { status: 403 }
    );
  }

  const testEmail = "luis.espinoza.na@gmail.com";
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

    // Datos dummy para simular un formulario completo
    const dummyData = {
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '+54 11 1234-5678',
      zona: 'Palermo, CABA',
      direccion: 'Av. Santa Fe 1234, 3er piso',
      descripcionProblema: 'Mi horno AEG no calienta correctamente. Cuando lo enciendo, solo se calienta la parte inferior y la superior no funciona. También noto que el temporizador no funciona bien. Necesito que vengan a revisarlo lo antes posible.',
      selectedServices: JSON.stringify([
        'Reparación de hornos',
        'Mantenimiento preventivo',
        'Diagnóstico técnico'
      ])
    };

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_DOMAIN || 'onboarding@resend.dev',
      to: [testEmail],
      subject: 'Prueba de email con datos dummy - AEG Hornos',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Prueba de email - AEG Hornos</title>
          <style>
            body {
              font-family: Arial, Helvetica, sans-serif;
              line-height: 1.6;
              color: #1c1917;
              background-color: #fef7ed;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .content {
              padding: 30px;
            }
            .section {
              margin-bottom: 25px;
              padding: 20px;
              background-color: #f5f5f4;
              border-radius: 8px;
              border-left: 4px solid #ea580c;
            }
            .section h3 {
              color: #ea580c;
              margin-top: 0;
              margin-bottom: 15px;
              font-size: 18px;
              font-weight: bold;
            }
            .info-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .info-list li {
              padding: 8px 0;
              border-bottom: 1px solid #e5e5e5;
            }
            .info-list li:last-child {
              border-bottom: none;
            }
            .info-list strong {
              color: #c2410c;
              display: inline-block;
              width: 100px;
            }
            .services-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .services-list li {
              background-color: #ffffff;
              padding: 10px 15px;
              margin: 5px 0;
              border-radius: 6px;
              border: 1px solid #e5e5e5;
              color: #1c1917;
            }
            .problem-description {
              background-color: #ffffff;
              padding: 15px;
              border-radius: 6px;
              border: 1px solid #e5e5e5;
              margin-top: 10px;
            }
            .footer {
              background-color: #f5f5f4;
              padding: 20px 30px;
              text-align: center;
              color: #666;
              font-size: 14px;
              border-top: 1px solid #e5e5e5;
            }
            .badge {
              display: inline-block;
              background-color: #f59e0b;
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              margin: 2px;
            }
            .test-notice {
              background-color: #fff3cd;
              border: 1px solid #ffeaa7;
              color: #856404;
              padding: 15px;
              border-radius: 6px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nueva Consulta Recibida</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">AEG Hornos - Servicio Técnico</p>
            </div>
            
            <div class="content">
              <div class="test-notice">
                <strong>⚠️ EMAIL DE PRUEBA</strong><br>
                Este es un email de prueba con datos dummy para verificar el formato y estilos.
                <br><strong>Timestamp:</strong> ${new Date().toISOString()}
              </div>

              <div class="section">
                <h3>👤 Información del Cliente</h3>
                <ul class="info-list">
                  <li><strong>Nombre:</strong> ${dummyData.nombre}</li>
                  <li><strong>Email:</strong> ${dummyData.email}</li>
                  <li><strong>Teléfono:</strong> ${dummyData.telefono}</li>
                  <li><strong>Zona:</strong> ${dummyData.zona}</li>
                  <li><strong>Dirección:</strong> ${dummyData.direccion}</li>
                </ul>
              </div>

              <div class="section">
                <h3>🔧 Servicios de Interés</h3>
                <ul class="services-list">
                  <li>Reparación de hornos</li>
                  <li>Mantenimiento preventivo</li>
                  <li>Diagnóstico técnico</li>
                </ul>
              </div>

              <div class="section">
                <h3>Descripción del Problema</h3>
                <div class="problem-description">
                  ${dummyData.descripcionProblema}
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p><em>Este email fue enviado desde el formulario de contacto de AEG Hornos</em></p>
              <p style="margin-top: 10px;">
                <span class="badge">Servicio Técnico</span>
                <span class="badge">Reparación</span>
                <span class="badge">Mantenimiento</span>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      return NextResponse.json(
        { 
          error: 'Error al enviar email de prueba ' + JSON.stringify(error, null, 2),
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

  } catch (error: unknown) {
    return NextResponse.json(
      { 
        error: 'Error al enviar email de prueba',
        details: error instanceof Error ? error.message : 'Error desconocido',
        config: {
          hasApiKey: !!process.env.RESEND_API_KEY
        }
      },
      { status: 500 }
    );
  }
} 