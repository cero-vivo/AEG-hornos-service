# Customer Data Storage Feature

## Overview
This feature adds customer data persistence to the contact form, storing all customer information in Firebase Firestore for easy follow-up and tracking.

## Data Structure

### Customer Data Fields
- **nombre**: Customer full name
- **email**: Customer email address
- **telefono**: Customer phone number
- **direccion**: Customer address
- **zona**: Service zone ('CABA', 'AMBA', or 'Interior')
- **descripcionProblema**: Problem description provided by customer
- **selectedServices**: Array of selected services
- **fechaContacto**: Contact date (automatically set to current date)
- **estado**: Customer status ('nuevo', 'contactado', 'en_proceso', 'completado')
- **notas**: Optional notes for follow-up
- **fotoUrls**: Array of photo URLs (for future photo upload feature)

## Implementation Details

### Files Added
- `src/types/customer.ts`: TypeScript interfaces for customer data
- `src/lib/customerService.ts`: Service functions for Firestore operations

### Files Modified
- `src/lib/firebase.ts`: Added Firestore export
- `src/components/ui/ContactForm/index.tsx`: Added Firestore data saving

## Usage
When customers submit the contact form, their data is automatically:
1. Saved to Firestore collection 'customers'
2. Email is sent to the configured email address
3. Customer receives confirmation

## Firestore Collection Structure
```
customers/
  ├── [auto-generated-id]
  │   ├── nombre: string
  │   ├── email: string
  │   ├── telefono: string
  │   ├── direccion: string
  │   ├── zona: string
  │   ├── descripcionProblema: string
  │   ├── selectedServices: array<string>
  │   ├── fechaContacto: timestamp
  │   ├── estado: string
  │   ├── notas: string (optional)
  │   └── fotoUrls: array<string> (optional)
```

## Future Enhancements
- Photo upload to Firebase Storage
- Customer dashboard for tracking requests
- Admin panel for managing customer data
- Automated follow-up system