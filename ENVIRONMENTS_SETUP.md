# Configuración de Ambientes

Este proyecto utiliza un sistema de configuración de ambientes para separar las configuraciones de desarrollo y producción, especialmente para Remote Config.

## Estructura de Archivos

- `src/config/environments.ts`: Configuración centralizada de ambientes
- `.env.development.example`: Variables de entorno para desarrollo
- `.env.production.example`: Variables de entorno para producción

## Configuración de Ambientes

### Desarrollo
1. Copia `.env.development.example` a `.env.local`
2. Actualiza las variables con tus credenciales de desarrollo
3. Remote Config se actualizará en tiempo real (sin caché)

### Producción
1. Copia `.env.production.example` a `.env.local` (o configura en tu hosting)
2. Actualiza las variables con tus credenciales de producción
3. Remote Config tiene caché de 1 hora para optimizar rendimiento

## Remote Config por Ambiente

### Desarrollo
- `minimumFetchIntervalMillis: 0` (sin caché)
- `fetchTimeoutMillis: 10000` (10 segundos)
- Se actualiza cada vez que se carga la página

### Producción
- `minimumFetchIntervalMillis: 3600000` (1 hora)
- `fetchTimeoutMillis: 60000` (1 minuto)
- Usa caché para mejorar el rendimiento

## Variables de Entorno Requeridas

### Firebase (ambos ambientes)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (opcional)

### Resend
- `RESEND_API_KEY`
- `RESEND_FROM_DOMAIN`

## Uso en el Código

```typescript
import { config } from '@/config/environments';

// Verificar si estás en desarrollo
if (config.general.isDevelopment) {
  console.log('Modo desarrollo activo');
}

// Usar configuración de Remote Config
import { remoteConfig } from '@/lib/firebase';
// Remote Config ya está configurado según el ambiente
```

## Comandos de Desarrollo

```bash
# Desarrollo
npm run dev

# Producción (build)
npm run build
npm start
```

## Notas Importantes

- Nunca commitees los archivos `.env.local` (ya están en .gitignore)
- Usa los archivos `.example` como plantilla
- Los cambios en Remote Config en producción pueden tomar hasta 1 hora en reflejarse
- En desarrollo, Remote Config se actualiza inmediatamente