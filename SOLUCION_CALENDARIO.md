# 🔧 Solución: "No hay horarios disponibles"

## ❌ **Problema Detectado**
Error: `invalid_grant: Invalid grant: account not found`

## ✅ **Diagnóstico Completo**
- ✅ Variables de entorno configuradas
- ✅ Código funcionando correctamente  
- ❌ **Service Account de Google mal configurada**

## 🛠️ **Solución Paso a Paso**

### **Paso 1: Verificar Service Account en Google Cloud**

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a **"IAM y administración" > "Cuentas de servicio"**
4. Verifica que existe una cuenta con el email: `your-service-account@your-project.iam.gserviceaccount.com`

### **Paso 2: Si NO existe la Service Account**

1. Haz clic en **"+ CREAR CUENTA DE SERVICIO"**
2. Completa:
   - **Nombre:** `aeg-calendar-service`
   - **ID:** se genera automáticamente
   - **Descripción:** `Service account para calendar de AEG Hornos`
3. Haz clic en **"CREAR Y CONTINUAR"**
4. **NO agregues roles** (opcional por ahora)
5. Haz clic en **"LISTO"**

### **Paso 3: Generar Nueva Clave**

1. Haz clic en la service account que acabas de crear
2. Ve a la pestaña **"CLAVES"**
3. Haz clic en **"AGREGAR CLAVE" > "Crear nueva clave"**
4. Selecciona **"JSON"**
5. Se descargará un archivo - **¡GUÁRDALO SEGURO!**

### **Paso 4: Actualizar Variables de Entorno**

Del archivo JSON descargado, copia estos valores a tu `.env.local`:

```bash
# Copiar del campo "client_email"
GOOGLE_SERVICE_ACCOUNT_EMAIL=nueva-service-account@tu-proyecto.iam.gserviceaccount.com

# Copiar del campo "private_key" (¡IMPORTANTE! Mantener los \n)
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\ntu_nueva_clave_aqui\n-----END PRIVATE KEY-----\n"
```

### **Paso 5: Compartir el Calendario**

⚠️ **MUY IMPORTANTE**: Debes compartir tu calendario con la nueva service account:

1. Ve a [Google Calendar](https://calendar.google.com/)
2. Busca tu calendario "AEG Hornos - Citas"
3. Haz clic en los **tres puntos** > **"Configuración y uso compartido"**
4. En **"Compartir con personas específicas"**, haz clic en **"+ Agregar personas"**
5. Agrega el email de tu service account: `nueva-service-account@tu-proyecto.iam.gserviceaccount.com`
6. Dale permisos de **"Realizar cambios en los eventos"**
7. Haz clic en **"Enviar"**

### **Paso 6: Reiniciar el Servidor**

```bash
# Detener el servidor (Ctrl+C en la terminal)
# Luego reiniciar:
npm run dev
```

### **Paso 7: Probar Nuevamente**

1. Ve a tu página web
2. Haz clic en **"Agendar ahora"**
3. Selecciona una fecha
4. ¡Deberías ver horarios disponibles!

## 🧪 **Comandos de Prueba**

Para verificar que está funcionando:

```bash
# Probar la conexión
curl http://localhost:3000/api/calendar/test-connection

# Debería devolver: "success": true
```

```bash
# Probar los horarios (cambiar la fecha por mañana)
curl "http://localhost:3000/api/calendar/available-slots?date=2024-12-24"

# Debería mostrar slots disponibles
```

## 🔍 **Si Aún No Funciona**

### **Verificar el ID del Calendario**

1. En Google Calendar, ve a tu calendario AEG
2. **"Configuración y uso compartido"**
3. Busca **"Integrar calendario"**
4. Copia el **"ID del calendario"** (algo como: `abc123@group.calendar.google.com`)
5. Actualiza en `.env.local`:

```bash
GOOGLE_CALENDAR_ID=tu_calendario_id_real@group.calendar.google.com
```

### **Verificar la Clave Privada**

La clave debe mantener exactamente este formato:

```bash
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
```

⚠️ **NO eliminar** los `\n` del principio y final

## 📞 **¿Necesitas Ayuda?**

Si el problema persiste:

1. Verifica que Google Calendar API esté **habilitada** en tu proyecto
2. Confirma que la service account tiene **acceso al calendario**
3. Revisa que no haya **espacios extra** en las variables de entorno
4. Usa las **comillas correctas** (dobles, no simples)

## ✅ **Una vez que funcione**

- Los clientes podrán agendar citas 24/7
- Recibirás notificaciones automáticas
- Todo se sincroniza con tu Google Calendar
- Videollamadas automáticas para clientes del interior 