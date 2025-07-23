# Configuración de Google Calendar para AEG Hornos

Esta guía te ayudará a configurar la integración de Google Calendar para que los clientes puedan agendar citas directamente desde tu sitio web.

## 📋 Funcionalidades Implementadas

- ✅ **Calendario interactivo** con selección de fechas y horarios
- ✅ **Horarios disponibles** de 9:00 AM a 6:00 PM (excluyendo domingos)
- ✅ **Validación automática** de disponibilidad 
- ✅ **Videollamadas automáticas** para clientes del interior
- ✅ **Notificaciones por email** a cliente y empresa
- ✅ **Formulario integrado** con datos del cliente y servicios seleccionados
- ✅ **Interfaz responsive** optimizada para móviles

## 🚀 Pasos para Configurar Google Calendar

### 1. Crear un Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Dale un nombre como "AEG Hornos Calendar"

### 2. Habilitar Google Calendar API

1. En el menú lateral, ve a **"APIs y servicios" > "Biblioteca"**
2. Busca **"Google Calendar API"**
3. Haz clic en **"Habilitar"**

### 3. Crear Credenciales de Service Account

1. Ve a **"APIs y servicios" > "Credenciales"**
2. Haz clic en **"+ CREAR CREDENCIALES" > "Cuenta de servicio"**
3. Completa los datos:
   - **Nombre:** `aeg-calendar-service`
   - **Descripción:** `Service account para calendar de AEG Hornos`
4. Haz clic en **"Crear y continuar"**
5. En "Otorgar acceso", no agregues roles (opcional)
6. Haz clic en **"Listo"**

### 4. Generar Clave Privada

1. En la lista de cuentas de servicio, haz clic en la que acabas de crear
2. Ve a la pestaña **"Claves"**
3. Haz clic en **"Agregar clave" > "Crear nueva clave"**
4. Selecciona **"JSON"** y haz clic en **"Crear"**
5. **¡IMPORTANTE!** Guarda este archivo JSON de forma segura

### 5. Configurar el Calendario

1. Ve a [Google Calendar](https://calendar.google.com/)
2. Crea un nuevo calendario específico para AEG Hornos:
   - Clic en el **"+"** junto a "Otros calendarios"
   - Selecciona **"Crear nuevo calendario"**
   - Nombre: **"AEG Hornos - Citas"**
   - Descripción: **"Calendario para agendar citas de servicio técnico"**
3. Una vez creado, ve a **"Configuración y uso compartido"** del calendario
4. En **"Integrar calendario"**, copia el **"ID del calendario"**
5. En **"Compartir con personas específicas"**, agrega:
   - La cuenta de servicio (email que termina en `@tu-proyecto.iam.gserviceaccount.com`)
   - Dale permisos de **"Realizar cambios en los eventos"**

## 🔧 Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz de tu proyecto con estas variables:

```bash
# Google Calendar API Configuration
GOOGLE_CLIENT_ID=tu_cliente_id_aqui
GOOGLE_CLIENT_SECRET=tu_cliente_secreto_aqui
GOOGLE_CALENDAR_ID=el_id_del_calendario_copiado_en_paso5
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\ntu_clave_privada_aqui\n-----END PRIVATE KEY-----\n"

# Next.js Configuration  
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=un_string_secreto_aleatorio

# Company Configuration
AEG_PHONE_NUMBER=+5491123881314
AEG_EMAIL=luis.espinoza.nav@outlook.com
```

### ⚠️ Importante sobre GOOGLE_PRIVATE_KEY

Del archivo JSON descargado, copia el valor del campo `private_key` y:
1. Reemplaza todos los `\n` literales con saltos de línea reales
2. Asegúrate de que esté envuelto en comillas dobles
3. Mantén los `\n` al principio y final

**Ejemplo correcto:**
```bash
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

## 📅 Configuración de Horarios

Los horarios están configurados en `src/lib/googleCalendar.ts`:

- **Días laborales:** Lunes a Sábado (domingo excluido)
- **Horario:** 9:00 AM a 6:00 PM
- **Slots:** Cada 30 minutos
- **Duración de cita:** 1 hora por defecto

Para modificar estos horarios, edita la función `getAvailableSlots` en el archivo mencionado.

## 🎥 Videollamadas Automáticas

Para clientes del interior (zona "interior"), se generan automáticamente:
- **Google Meet links** integrados en la cita
- **Notificaciones** con el link de la videollamada
- **Emails automáticos** tanto al cliente como a AEG

## 🧪 Probar la Integración

1. Inicia el servidor de desarrollo: `npm run dev`
2. Ve a la sección "Contacto" de tu página
3. Haz clic en **"Agendar ahora"** en la tarjeta de calendario
4. Prueba agendar una cita con datos de prueba
5. Verifica que aparezca en tu Google Calendar

## 🔐 Seguridad

- **Nunca** compartas tu archivo `.env.local`
- **Nunca** subas las credenciales a Git
- El archivo `.env.local` ya está en `.gitignore`
- Usa variables de entorno en producción (Vercel, Netlify, etc.)

## 🚀 Despliegue en Producción

En tu plataforma de hosting (Vercel, Netlify, etc.), configura estas variables de entorno:

1. Ve a la configuración de tu proyecto
2. Agrega todas las variables del archivo `.env.local`
3. Para `GOOGLE_PRIVATE_KEY`, asegúrate de mantener los saltos de línea correctos

## 📞 Soporte

Si tienes problemas con la configuración:

1. Verifica que Google Calendar API esté habilitada
2. Confirma que las credenciales sean correctas
3. Revisa que el calendario esté compartido con la service account
4. Verifica los logs de la consola del navegador para errores

## 🎯 Próximas Mejoras

Funcionalidades que puedes agregar:

- **Recordatorios automáticos** 24 horas antes
- **Sincronización bidireccional** con otros calendarios
- **Zona horaria automática** según ubicación del cliente
- **Reprogramación** de citas existentes
- **Calendario admin** para gestionar disponibilidad 