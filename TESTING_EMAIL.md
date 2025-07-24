# Pruebas del formulario de contacto con MailerSend

## Cómo probar el envío de emails

### 1. Configuración inicial
Asegúrate de haber seguido los pasos en `EMAIL_SETUP.md` para configurar MailerSend y las variables de entorno.

### 2. Probar el formulario
1. Inicia el servidor de desarrollo: `npm run dev`
2. Ve a la página del formulario de contacto
3. Completa todos los campos requeridos:
   - Nombre completo
   - Email
   - Teléfono
   - Zona de servicio
   - Descripción del problema
4. **Opcional**: Carga imágenes del horno
5. Haz clic en "Enviar solicitud"

### 3. Verificar el envío
- Si la configuración es correcta, verás el mensaje de éxito
- Revisa tu bandeja de entrada en `luis.espinoza.nav@outlook.com`
- El email debe contener toda la información del formulario
- **Las imágenes aparecerán como adjuntos** si se cargaron

### 4. Casos de prueba

#### Caso exitoso:
- Todos los campos requeridos completados
- Email válido
- API Key de MailerSend configurada correctamente
- Imágenes adjuntas (opcional)

#### Casos de error:
- Campos faltantes → Error de validación
- Email inválido → Error de formato
- Sin configuración de MAILERSEND_API_KEY → Error de configuración
- Problemas de conexión → Error de red

### 5. Estructura del email recibido
El email incluirá:
```
Asunto: Nueva consulta de [Nombre] - AEG Hornos

Información del cliente:
- Nombre: [Nombre completo]
- Email: [Email del cliente]
- Teléfono: [Teléfono]
- Zona: [Zona seleccionada]
- Dirección: [Dirección si se proporcionó]

Servicios de interés: (si se seleccionaron)
- [Lista de servicios]

Descripción del problema:
[Descripción detallada del problema]

Imágenes adjuntas: (si se cargaron)
- [Lista de imágenes con nombres y tamaños]
```

**Nota**: Las imágenes se adjuntan al email y se pueden descargar directamente desde el cliente de correo.

### 6. Solución de problemas

#### Error: "Configuración de email incompleta"
- Verifica que el archivo `.env.local` existe
- Asegúrate de que MAILERSEND_API_KEY esté configurado
- Confirma que la API key es válida en el dashboard de MailerSend
- Reinicia el servidor después de crear/modificar `.env.local`

#### Error: "Error de conexión"
- Verifica tu conexión a internet
- Confirma que la API key de MailerSend es correcta
- Revisa que el email de remitente esté verificado en MailerSend

#### Error: "Faltan campos requeridos"
- Completa todos los campos marcados con *
- Verifica que el formato del email sea válido
- Asegúrate de seleccionar una zona de servicio

### 7. Ventajas de MailerSend vs nodemailer

| Característica | MailerSend | Nodemailer |
|----------------|------------|------------|
| Configuración | Solo API key | SMTP + contraseñas |
| Deliverability | Excelente | Variable |
| Adjuntos | ✅ Soportado | ✅ Soportado |
| Analytics | ✅ Incluido | ❌ No disponible |
| Plan gratuito | 12,000 emails/mes | Depende del proveedor |
| Soporte | ✅ 24/7 | ❌ Limitado | 