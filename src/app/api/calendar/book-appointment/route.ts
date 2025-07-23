import { NextRequest, NextResponse } from 'next/server';
import { googleCalendarService } from '@/lib/googleCalendar';
import { AppointmentRequest } from '@/types/calendar';

export async function POST(request: NextRequest) {
  try {
    const body: AppointmentRequest = await request.json();

    // Validar campos requeridos
    const missingFields: string[] = [];
    if (!body.customerName) missingFields.push('customerName');
    if (!body.customerEmail) missingFields.push('customerEmail');
    if (!body.customerPhone) missingFields.push('customerPhone');
    if (!body.dateTime) missingFields.push('dateTime');
    if (!body.zone) missingFields.push('zone');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Campos requeridos faltantes: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.customerEmail)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Validar fecha/hora
    const appointmentDate = new Date(body.dateTime);
    const now = new Date();

    if (appointmentDate <= now) {
      return NextResponse.json(
        { error: 'No se pueden agendar citas en el pasado' },
        { status: 400 }
      );
    }

    // Validar horario de trabajo (9 AM - 6 PM)
    const hour = appointmentDate.getHours();
    if (hour < 9 || hour >= 18) {
      return NextResponse.json(
        { error: 'Horario fuera del rango permitido (9:00 - 18:00)' },
        { status: 400 }
      );
    }

    // Validar que no sea domingo
    if (appointmentDate.getDay() === 0) {
      return NextResponse.json(
        { error: 'No se atiende los domingos' },
        { status: 400 }
      );
    }

    // Validar zona
    const validZones = ['caba', 'amba', 'interior'];
    if (!validZones.includes(body.zone)) {
      return NextResponse.json(
        { error: 'Zona de servicio inválida' },
        { status: 400 }
      );
    }

    // Crear la cita
    const result = await googleCalendarService.createAppointment(body);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        eventId: result.eventId,
        meetLink: result.meetLink,
      });
    } else {
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error en API de agendamiento:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 