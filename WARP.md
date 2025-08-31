# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Essential Development Commands

### Environment Setup
```bash
# Install dependencies
npm install

# Development (copies .env.development.example to .env.local automatically)
npm run dev

# Production mode (copies .env.production.example to .env.local)
npm run prod

# Check environment configuration
npm run env:check
```

### Build and Deploy
```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Testing APIs
```bash
# Test email functionality (development only)
# Visit http://localhost:3000/test-email after running dev server
# Test Resend integration at http://localhost:3000/test-resend
```

## Architecture Overview

This is a **Next.js 15** service landing page for AEG Hornos (ceramic oven repair service) with the following key architectural patterns:

### Multi-Environment Configuration System
- **Environment-specific configs**: `src/config/environments.ts` centralizes all environment settings
- **Firebase Remote Config**: Development has real-time updates (no cache), production has 1-hour cache
- **Automatic env file switching**: Scripts automatically copy the appropriate `.env.example` file
- **Dual service integration**: Firebase (Firestore + Remote Config) and Resend (email service)

### Content-Driven Architecture
- **Centralized content**: All texts, services, and contact info stored in `src/data/content.json`
- **Dynamic service selection**: Users can select multiple services that persist across components
- **State management**: Service selection managed at page level and passed down to components

### Component Architecture
```
src/app/page.tsx (State orchestrator)
├── Hero (Landing section)
├── Services (Service catalog with selection)
├── About (Company information) 
├── ContactOptions (Contact method selection)
├── Contact (Contact form)
├── Footer (Footer with contact generation)
├── FloatingCart (Selected services tracker)
└── FloatingNav (Sticky navigation)
```

### Data Flow Patterns
1. **Service Selection Flow**: page.tsx → Services → FloatingCart → ContactOptions → Contact
2. **Message Generation**: Selected services generate different WhatsApp/contact messages
3. **Customer Data Persistence**: Contact form saves to Firestore + sends email via Resend
4. **Remote Config Integration**: Hooks fetch dynamic content from Firebase

### Key Integration Points

#### Firebase Integration
- **Firestore**: Customer data persistence (`customers` collection)
- **Remote Config**: Dynamic content management with environment-specific caching
- **Types**: `CustomerData` and `CustomerFormData` interfaces in `src/types/customer.ts`

#### Email System (Resend)
- **API Route**: `/api/contact` handles form submissions with file attachments
- **HTML Email Templates**: Rich email formatting with inline styles
- **Multi-file attachment support**: Images uploaded with form submissions

#### Custom Hooks Pattern
```typescript
// Custom hooks for Remote Config data
useEmailContacto()    // Fetches contact email
useInstagram()        // Fetches Instagram handle
useNumeroTel()        // Fetches phone number
useNumeroWsp()        // Fetches WhatsApp number
useServicios()        // Fetches services (alternative to content.json)
```

## File Structure Insights

### Critical Configuration Files
- `src/config/environments.ts`: All environment-specific settings
- `src/data/content.json`: Primary content source (services, contact info, messages)
- `.env.*.example`: Template files for different environments

### Component Organization
- `src/components/sections/`: Page sections (Hero, Services, About, etc.)
- `src/components/ui/`: Reusable UI components (ContactForm, Modal, ServiceCard)
- `src/components/layout/`: Layout components (FloatingNav, FloatingCart)

### Service Layer
- `src/lib/firebase.ts`: Firebase initialization and exports
- `src/lib/customerService.ts`: Firestore operations for customer data
- `src/hooks/`: Custom hooks for Remote Config data fetching

## Development Notes

### Content Updates
- **Text changes**: Modify `src/data/content.json` directly
- **Service pricing**: Update `services.items[].price` in content.json
- **Contact information**: Update `company` section in content.json
- **WhatsApp messages**: Modify `messages` section in content.json

### Environment Switching
- Development: Uses `check-environments.js` for validation
- Production: Remote Config has 1-hour cache for performance
- Both environments require Firebase and Resend API keys

### State Management Pattern
- **Service selection**: Managed at page level with `useState<string[]>`
- **Message generation**: Dynamic WhatsApp/email message creation based on selected services
- **Form persistence**: Customer data saved to Firestore before email sending

### Testing Integration Points
- Contact form submission: Test with `/api/contact` endpoint
- Email sending: Use test pages at `/test-email` and `/test-resend`
- Environment validation: Run `npm run env:check`
