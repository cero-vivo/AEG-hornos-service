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
      <h2>Nueva consulta recibida</h2>
      
      <h3>Información del cliente:</h3>
      <ul>
        <li><strong>Nombre:</strong> ${nombre}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${telefono}</li>
        <li><strong>Zona:</strong> ${zona}</li>
        ${direccion ? `<li><strong>Dirección:</strong> ${direccion}</li>` : ''}
      </ul>

      ${servicesArray && servicesArray.length > 0 ? `
        <h3>Servicios de interés:</h3>
        <ul>
          ${servicesArray.map((service: string) => `<li>${service}</li>`).join('')}
        </ul>
      ` : ''}

      <h3>Descripción del problema:</h3>
      <p>${descripcionProblema}</p>

      ${fotos && fotos.length > 0 ? `
        <h3>Imágenes adjuntas:</h3>
        <p>Se han adjuntado ${fotos.length} imagen${fotos.length > 1 ? 'es' : ''} del horno:</p>
        <ul>
          ${fotos.map((foto) => `<li>${foto.name} (${(foto.size / 1024 / 1024).toFixed(1)} MB)</li>`).join('')}
        </ul>
      ` : ''}

      <hr>
      <p><em>Este email fue enviado desde el formulario de contacto de AEG Hornos</em></p>
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

    // Enviar el email
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [content.company.email],
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