import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import content from '@/data/content.json';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string;
    const zona = formData.get('zona') as string;
    const direccion = formData.get('direccion') as string;
    const descripcionProblema = formData.get('descripcionProblema') as string;
    const selectedServices = formData.get('selectedServices') as string;
    const emailDestino = formData.get('emailDestino') as string;
    
    // Parsear servicios seleccionados
    const servicesArray = selectedServices ? JSON.parse(selectedServices) : [];
    
    // Obtener las imágenes
    const fotos = formData.getAll('fotos') as File[];

    // Validar campos requeridos
    if (!nombre || !email || !telefono || !zona || !descripcionProblema) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Crear el contenido del email
    const emailSubject = `Nueva consulta de ${nombre} - AEG Hornos`;
    
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva consulta - AEG Hornos</title>
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
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nueva Consulta Recibida</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">AEG Hornos - Servicio Técnico</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h3>👤 Información del Cliente</h3>
              <ul class="info-list">
                <li><strong>Nombre:</strong> ${nombre}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Teléfono:</strong> ${telefono}</li>
                <li><strong>Zona:</strong> ${zona}</li>
                ${direccion ? `<li><strong>Dirección:</strong> ${direccion}</li>` : ''}
              </ul>
            </div>

            ${servicesArray && servicesArray.length > 0 ? `
              <div class="section">
                <h3>🔧 Servicios de Interés</h3>
                <ul class="services-list">
                  ${servicesArray.map((service: string) => `<li>${service}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <div class="section">
              <h3>Descripción del Problema</h3>
              <div class="problem-description">
                ${descripcionProblema}
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
    `;

    // Preparar adjuntos si hay imágenes
    const attachments = [];
    if (fotos && fotos.length > 0) {
      for (const foto of fotos) {
        const buffer = Buffer.from(await foto.arrayBuffer());
        attachments.push({
          filename: foto.name,
          content: buffer
        });
      }
    }

    // Usar el email que viene del frontend o fallback
    const emailToSend = emailDestino || content.company.email;
    
    // Enviar el email
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_DOMAIN || 'onboarding@resend.dev',
      to: [emailToSend],
      subject: emailSubject,
      html: emailContent,
      replyTo: email,
      attachments: attachments.length > 0 ? attachments : undefined
    });

    if (error) {
      console.error('Error enviando email:', error);
      return NextResponse.json(
        { error: 'Error al enviar email', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email enviado correctamente', data },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Error enviando email:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: (error as Error).message },
      { status: 500 }
    );
  }
} 