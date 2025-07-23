import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { AppointmentRequest, GoogleCalendarEvent, TimeSlot } from '@/types/calendar';

class GoogleCalendarService {
  private calendar;
  private calendarId: string;

  constructor() {
    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
      ],
    });

    this.calendar = google.calendar({ version: 'v3', auth });
    this.calendarId = process.env.GOOGLE_CALENDAR_ID?.trim() || 'primary';
  }

  async getAvailableSlots(date: string): Promise<TimeSlot[]> {
    try {
      
      const startOfDay = new Date(date);
      startOfDay.setHours(9, 0, 0, 0); // 9:00 AM
      
      const endOfDay = new Date(date);
      endOfDay.setHours(18, 0, 0, 0); // 6:00 PM

      // Verificar que tenemos las credenciales
      if (!this.calendarId) {
        console.error('❌ No calendar ID configured');
        throw new Error('Calendar ID not configured');
      }

      // Obtener eventos existentes para el día
      const response = await this.calendar.events.list({
        calendarId: this.calendarId,
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      const existingEvents = response.data.items || [];
      
      // Generar slots de 30 minutos desde 9 AM a 6 PM
      const slots: TimeSlot[] = [];
      const current = new Date(startOfDay);
      
      while (current < endOfDay) {
        const slotStart = new Date(current);
        const slotEnd = new Date(current.getTime() + 30 * 60 * 1000); // 30 minutos
        
        // Verificar si el slot está ocupado
        const isOccupied = existingEvents.some(event => {
          if (!event.start?.dateTime || !event.end?.dateTime) return false;
          
          const eventStart = new Date(event.start.dateTime);
          const eventEnd = new Date(event.end.dateTime);
          
          return (slotStart < eventEnd && slotEnd > eventStart);
        });

        const slot = {
          id: `${date}-${current.getHours()}-${current.getMinutes()}`,
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          available: !isOccupied,
        };

        slots.push(slot);
        current.setMinutes(current.getMinutes() + 30);
      }

      return slots;
    } catch (error) {
      console.error('❌ Error obteniendo slots disponibles:', error);
      
      // Re-throw para que el API endpoint pueda manejar específicamente errores de Calendar
      if (error instanceof Error) {
        throw new Error(`Calendar error: ${error.message}`);
      }
      
      throw new Error('Unknown calendar error');
    }
  }

  async createAppointment(appointment: AppointmentRequest): Promise<{ success: boolean; eventId?: string; meetLink?: string; message: string }> {
    try {
      const startTime = new Date(appointment.dateTime);
      const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hora

      const isVirtual = appointment.zone === 'interior';
      
      const event: GoogleCalendarEvent = {
        summary: `Consulta AEG - ${appointment.customerName}`,
        description: this.buildEventDescription(appointment),
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'America/Argentina/Buenos_Aires',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'America/Argentina/Buenos_Aires',
        }
      };

      // Agregar videollamada si es virtual
      if (isVirtual) {
        event.conferenceData = {
          conferenceSolution: {
            key: {
              type: 'hangoutsMeet',
            },
          },
          createRequest: {
            requestId: `aeg-meet-${Date.now()}`,
          },
        };
      }

      if (!this.calendarId) {
        throw new Error('Calendar ID not configured');
      }

      const response = await this.calendar.events.insert({
        calendarId: this.calendarId,
        requestBody: event,
        conferenceDataVersion: isVirtual ? 1 : 0,
        sendUpdates: 'all',
      });

      const meetLink = response.data.conferenceData?.entryPoints?.[0]?.uri;

      return {
        success: true,
        eventId: response.data.id || undefined,
        meetLink: meetLink,
        message: `Cita agendada exitosamente para el ${startTime.toLocaleDateString('es-AR')} a las ${startTime.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`,
      };
    } catch (error) {
      console.error('Error creando cita:', error);
      return {
        success: false,
        message: 'Error al agendar la cita. Por favor intenta nuevamente.',
      };
    }
  }

  private buildEventDescription(appointment: AppointmentRequest): string {
    let description = `🔧 CONSULTA AEG HORNOS

👤 Cliente: ${appointment.customerName}
📧 Email: ${appointment.customerEmail}
📱 Teléfono: ${appointment.customerPhone}
🗺️ Zona: ${appointment.zone.toUpperCase()}

🛠️ Servicios solicitados:
${appointment.selectedServices.map(service => `• ${service}`).join('\n')}`;

    if (appointment.notes) {
      description += `\n\n📝 Notas adicionales:\n${appointment.notes}`;
    }

    if (appointment.zone === 'interior') {
      description += '\n\n🎥 VIDEOLLAMADA: Esta consulta se realizará de forma virtual.';
    }

    return description;
  }

  async cancelAppointment(eventId: string): Promise<boolean> {
    try {
      if (!this.calendarId) {
        throw new Error('Calendar ID not configured');
      }

      await this.calendar.events.delete({
        calendarId: this.calendarId,
        eventId: eventId,
        sendUpdates: 'all',
      });
      return true;
    } catch (error) {
      console.error('Error cancelando cita:', error);
      return false;
    }
  }
}

export const googleCalendarService = new GoogleCalendarService(); 