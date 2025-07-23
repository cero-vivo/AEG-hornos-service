import { NextRequest, NextResponse } from 'next/server';
import { googleCalendarService } from '@/lib/googleCalendar';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json(
        { error: 'ID del evento requerido' },
        { status: 400 }
      );
    }

    const success = await googleCalendarService.cancelAppointment(eventId);

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Cita cancelada exitosamente'
      });
    } else {
      return NextResponse.json(
        { error: 'No se pudo cancelar la cita' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error en API de cancelación:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 