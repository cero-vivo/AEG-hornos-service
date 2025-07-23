export interface TimeSlot {
  id: string;
  start: string; // ISO string
  end: string; // ISO string
  available: boolean;
}

export interface CalendarDay {
  date: string; // YYYY-MM-DD
  slots: TimeSlot[];
  isAvailable: boolean;
}

export interface AppointmentRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  selectedServices: string[];
  dateTime: string; // ISO string
  zone: 'caba' | 'amba' | 'interior';
  notes?: string;
}

export interface AppointmentResponse {
  success: boolean;
  eventId?: string;
  meetLink?: string;
  message: string;
}

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
  }>;
  conferenceData?: {
    conferenceSolution: {
      key: {
        type: string;
      };
    };
    createRequest: {
      requestId: string;
    };
  };
} 