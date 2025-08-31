# Configuración de Resend para Producción - Guía Completa

Esta guía te ayudará a configurar Resend para producción con tu nuevo dominio y API key.

## 🔑 Paso 1: Obtener tu nueva API Key de producción

1. **Accede a tu cuenta de Resend**: Ve a [resend.com](https://resend.com)
2. **Ve a API Keys**: En el dashboard, busca "API Keys" en el menú lateral
3. **Crea nueva API Key**: 
   - Haz clic en "Create API Key"
   - Nombra la key: "AEG Hornos Producción"
   - Selecciona el entorno: "Production"
   - Copia la API key generada (empieza con `re_`)

## 🌐 Paso 2: Configurar el dominio personalizado

### Opción A: Dominio personalizado (recomendado)
Para usar `contacto@aeghornos.com.ar` necesitas:

1. **En Resend**:
   - Ve a "Domains" en el menú lateral
   - Haz clic en "Add Domain"
   - Ingresa: `aeghornos.com.ar`
   - Sigue las instrucciones para agregar los registros DNS

2. **En tu proveedor DNS** (donde compraste el dominio):
   - Agrega los registros DNS que te proporciona Resend:
   - **Registro TXT** para verificación del dominio
   - **Registros MX** para recibir emails
   - **Registro SPF** para evitar spam

3. **Verifica el dominio**:
   - Vuelve a Resend y haz clic en "Verify Domain"
   - Esto puede tomar hasta 48 horas

### Opción B: Usar dominio de Resend (rápido)
Si no tienes dominio personalizado, puedes usar:
- `onboarding@resend.dev` (gratis, pero menos profesional)
- O comprar un dominio nuevo

## ⚙️ Paso 3: Actualizar la configuración en tu proyecto

### 1. Actualiza el archivo `.env.production.example`:

```bash
# Abre el archivo .env.production.example
# Reemplaza YOUR_NEW_PRODUCTION_API_KEY_HERE con tu nueva API key

##RESEND - EMAIL SMTP
RESEND_API_KEY=re_tu_nueva_api_key_aqui
RESEND_FROM_DOMAIN=contacto@aeghornos.com.ar
```

### 2. Crea el archivo `.env.local` para producción:

```bash
# Copia el archivo de producción
cp .env.production.example .env.local

# Edita el archivo y actualiza con tus valores reales
nano .env.local
```

### 3. Verifica la configuración:

```bash
# Verifica que las variables estén correctas
node check-env.js
```

## 🧪 Paso 4: Probar la configuración

### Prueba local en modo producción:

```bash
# Construye y ejecuta en modo producción local
npm run prod

# Abre http://localhost:3000/test-resend
# Deberías ver que la conexión funciona
```

### Prueba de envío real:

1. **Accede al panel de administración**: `https://hornos-aeg.netlify.app/admin`
2. **Ve a "Clientes"**
3. **Selecciona algunos clientes**
4. **Haz clic en "Enviar Email"**
5. **Envía un email de prueba**

## 🚀 Paso 5: Desplegar a producción

### Para Netlify:

1. **En el dashboard de Netlify**:
   - Ve a "Site settings" → "Environment variables"
   - Agrega las siguientes variables:

```
RESEND_API_KEY=re_tu_nueva_api_key_aqui
RESEND_FROM_DOMAIN=contacto@aeghornos.com.ar
```

2. **Re-despliega**:
   - Ve a "Deploys" → "Trigger deploy" → "Deploy site"

### Verifica el despliegue:
- Abre `https://hornos-aeg.netlify.app/test-resend`
- Debería mostrar "✅ API Key configurada: Sí"

## 📋 Resumen de configuración

| Variable | Desarrollo | Producción |
|----------|------------|------------|
| `RESEND_API_KEY` | `re_Jdy4sDe1...` | `re_tu_nueva_key...` |
| `RESEND_FROM_DOMAIN` | `noreply@contact.luisespinozadev.site` | `contacto@aeghornos.com.ar` |

## 🔍 Solución de problemas

### Error: "Invalid API Key"
- Verifica que la API key esté correctamente copiada
- Asegúrate de usar la key de producción, no la de desarrollo

### Error: "Domain not verified"
- Si usas dominio personalizado, espera a que se verifique completamente
- Verifica los registros DNS en tu proveedor

### Error: "Failed to send email"
- Revisa los logs en Netlify Functions
- Verifica que `RESEND_FROM_DOMAIN` coincida con tu dominio verificado

## 📞 Soporte

Si tienes problemas:
1. **Resend**: [resend.com/support](https://resend.com/support)
2. **Documentación**: [resend.com/docs](https://resend.com/docs)
3. **Comunidad**: [resend.com/discord](https://resend.com/discord)

## ✅ Checklist final

- [ ] Obtener nueva API key de producción
- [ ] Configurar dominio personalizado (si aplica)
- [ ] Actualizar `.env.production.example`
- [ ] Configurar variables en Netlify
- [ ] Probar envío de emails
- [ ] Verificar despliegue exitoso

## 🎯 Próximos pasos

1. **Monitoreo**: Revisa los analytics en el dashboard de Resend
2. **Optimización**: Configura webhooks para eventos de email
3. **Personalización**: Crea templates de email más elaborados
4. **Escalabilidad**: Considera planes pagos si excedes el límite gratuito

---

**¿Necesitas ayuda con algún paso específico?** Contacta al equipo de soporte de Resend o revisa la documentación oficial.