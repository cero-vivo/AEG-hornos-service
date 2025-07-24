# Configuración Súper Simple con Resend

## ¿Por qué Resend?

- ✅ **Plug-and-play** - No necesitas configurar SMTP
- ✅ **Gratis** - 3,000 emails por mes gratis
- ✅ **Excelente deliverability** - Los emails llegan a la bandeja de entrada
- ✅ **Soporte para adjuntos** - Las imágenes se envían perfectamente
- ✅ **Configuración en 2 minutos**

## Pasos para configurar:

### 1. Crear cuenta en Resend
- Ve a [resend.com](https://resend.com)
- Crea una cuenta gratuita
- No necesitas verificar dominios

### 2. Obtener API Key
- En el dashboard, ve a "API Keys"
- Haz clic en "Create API Key"
- Copia la key generada

### 3. Configurar variables de entorno
Crea o edita el archivo `.env.local` en la raíz del proyecto:

```env
RESEND_API_KEY=re_1234567890abcdef...
```

### 4. Reiniciar servidor
```bash
npm run dev
```

### 5. Probar
Ve a `http://localhost:3000/test-email` y haz clic en "Probar Conexión"

## ¡Listo!

Eso es todo. Resend es súper simple y funciona inmediatamente. No necesitas:
- ❌ Verificar dominios
- ❌ Configurar SMTP
- ❌ Contraseñas de aplicación
- ❌ Configuraciones complejas

## Ventajas vs otras opciones:

| Característica | Resend | MailerSend | Nodemailer |
|----------------|--------|------------|------------|
| Configuración | 2 minutos | 15+ minutos | 30+ minutos |
| Verificación de dominio | ❌ No necesaria | ✅ Requerida | ✅ Requerida |
| Plan gratuito | 3,000 emails | 12,000 emails | Depende |
| Deliverability | Excelente | Buena | Variable |
| Soporte | ✅ 24/7 | ✅ Limitado | ❌ No disponible | 