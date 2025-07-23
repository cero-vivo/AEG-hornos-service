import { NextRequest, NextResponse } from 'next/server';
import { googleCalendarService } from '@/lib/googleCalendar';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Fecha requerida' },
        { status: 400 }
      );
    }

    // Validar formato de fecha (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: 'Formato de fecha inválido. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    // No permitir fechas pasadas
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return NextResponse.json(
        { error: 'No se pueden agendar citas en fechas pasadas' },
        { status: 400 }
      );
    }

    // No permitir días domingos (día 0)
    if (selectedDate.getDay() === 0) {
      return NextResponse.json(
        { slots: [], isAvailable: false, reason: 'No se atiende los domingos' },
        { status: 200 }
      );
    }

    const slots = await googleCalendarService.getAvailableSlots(date);
    
    const availableSlots = slots.filter(slot => slot.available);

    return NextResponse.json({
      date,
      slots: availableSlots,
      isAvailable: availableSlots.length > 0,
      debug: {
        totalSlots: slots.length,
        availableSlots: availableSlots.length,
        dayOfWeek: selectedDate.getDay(),
        isWeekend: selectedDate.getDay() === 0 || selectedDate.getDay() === 6,
      }
    });

  } catch (error) {
    
    if (error instanceof Error && error.message.includes('Calendar')) {
      return NextResponse.json(
        { 
          error: 'Error de configuración del calendario',
          details: error.message,
          suggestion: 'Verifica las credenciales de Google Calendar'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
} 