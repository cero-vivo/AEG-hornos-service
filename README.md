# AEG Hornos - Landing Page

![AEG Hornos](./public/hornos/horno1.jpg)

Sitio web profesional para AEG Hornos, especialistas en reparación y mantenimiento de hornos de cerámica en CABA y AMBA.

## 🚀 Características

- **Diseño responsivo** - Optimizado para móviles, tablets y desktop
- **Contenido centralizado** - Todos los textos en JSON para fácil mantenimiento
- **Arquitectura modular** - Componentes reutilizables y escalables
- **WhatsApp integrado** - Generación automática de mensajes con servicios seleccionados
- **Performance optimizada** - Next.js con optimización de imágenes
- **SEO friendly** - Meta tags y estructura semántica

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Configuración principal de Next.js
│   ├── page.tsx           # Página principal (orquestador de componentes)
│   ├── layout.tsx         # Layout base de la aplicación
│   ├── globals.css        # Estilos globales y variables CSS
│   └── landing.module.css # Estilos específicos del landing
├── components/            # Componentes reutilizables
│   ├── Hero.tsx          # Sección principal del sitio
│   ├── Services.tsx      # Catálogo de servicios
│   ├── ServiceCard.tsx   # Tarjeta individual de servicio
│   ├── About.tsx         # Información de la empresa
│   ├── ContactOptions.tsx # Opciones de contacto
│   ├── Contact.tsx       # Formulario de contacto
│   ├── ContactForm.tsx   # Formulario específico
│   ├── Footer.tsx        # Pie de página
│   ├── FloatingNav.tsx   # Navegación flotante
│   └── FloatingCart.tsx  # Carrito flotante de servicios
└── data/
    └── content.json      # 📝 Contenido centralizado
```

## 📝 Mantenimiento del Contenido

### Actualizar Textos

Todos los textos del sitio se encuentran centralizados en `src/data/content.json`. Para modificar cualquier texto:

1. **Abrir el archivo**: `src/data/content.json`
2. **Localizar la sección** que deseas editar
3. **Modificar el texto** manteniendo la estructura JSON
4. **Guardar el archivo** - Los cambios se aplican automáticamente

#### Secciones Principales:

```json
{
  "company": {
    "name": "AEG",
    "phone": "+5491123881314",
    "email": "luis.espinoza.nav@outlook.com"
  },
  "hero": {
    "title": "Tu horno de cerámica",
    "subtitle": "Mantenimiento profesional..."
  },
  "services": {
    "items": [...]
  }
}
```

### Cambiar Información de Contacto

Para actualizar datos de contacto (teléfono, email, redes sociales):

```json
{
  "company": {
    "phone": "+5491123881314",           // ← Cambiar aquí
    "email": "luis.espinoza.nav@outlook.com", // ← Cambiar aquí
    "instagram": "@hornosservice"        // ← Cambiar aquí
  }
}
```

### Modificar Servicios

Para agregar, editar o eliminar servicios:

```json
{
  "services": {
    "items": [
      {
        "icon": "Search",                // Íconos disponibles: Search, Sparkles, Wrench, Video, Settings
        "title": "Diagnóstico Profesional",
        "description": "Análisis técnico completo...",
        "price": "Desde $25.000",
        "ctaText": "Solicitar análisis"
      }
    ]
  }
}
```

### Actualizar Precios

Los precios se encuentran en la sección `services.items`:

```json
{
  "price": "Desde $25.000"  // ← Actualizar aquí
}
```

### Cambiar Mensajes de WhatsApp

Los mensajes automáticos de WhatsApp se configuran en:

```json
{
  "messages": {
    "whatsappDefault": "Hola! Tengo un problema con mi horno...",
    "whatsappWithServices": "\n\n🔧 Servicios que me interesan:",
    "whatsappFooter": "\n\n¿Podrían contactarme para coordinar? Gracias!"
  }
}
```

## 🛠️ Desarrollo

### Requisitos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

### Comandos Disponibles

```bash
npm run dev          # Desarrollo local (http://localhost:3000)
npm run build        # Construir para producción
npm run start        # Ejecutar versión de producción
npm run lint         # Verificar código con ESLint
```

## 🎨 Personalización de Estilos

### Variables CSS

Los colores principales se definen en `src/app/globals.css`:

```css
:root {
  --accent: #ea580c;          /* Color principal (naranja) */
  --accent-dark: #0f4c5c;     /* Color secundario (azul oscuro) */
  --accent-secondary: #f59e0b; /* Color terciario (amarillo) */
  --foreground: #0f172a;      /* Color de texto principal */
  --surface: #ffffff;         /* Color de fondo */
}
```

### Responsive Design

El sitio usa un enfoque mobile-first con breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 📱 Funcionalidades Móviles

### WhatsApp Integration

Los enlaces de WhatsApp se generan automáticamente con:
- Mensaje personalizado según servicios seleccionados
- Número de teléfono configurable
- Formato optimizado para móviles

### Navegación Flotante

- Menú sticky en la parte superior
- Carrito flotante para servicios seleccionados
- Navegación suave entre secciones

## 🔧 Componentes Principales

### Hero
Sección principal con título, estadísticas y call-to-action.

### Services  
Catálogo interactivo de servicios con selección múltiple.

### ContactOptions
Tres formas de contacto: inmediato, formulario y agendamiento.

### Footer
Información de contacto, zonas de servicio y enlaces sociales.

## 🚀 Deploy

### Vercel (Recomendado)

1. Conectar repositorio con Vercel
2. Configurar build command: `npm run build`
3. Deploy automático en cada push

### Otros Providers

El proyecto es compatible con cualquier hosting que soporte Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 📊 SEO y Performance

### Optimizaciones Incluidas

- **Images**: Optimización automática con Next.js Image
- **Fonts**: Carga optimizada de Google Fonts
- **CSS**: Modules para evitar conflictos
- **Bundle**: Tree shaking automático

### Meta Tags

Configurados en `src/app/layout.tsx` para SEO óptimo.

## 🤝 Contribución

### Workflow de Cambios

1. **Contenido**: Editar `src/data/content.json`
2. **Estilos**: Modificar archivos CSS correspondientes
3. **Componentes**: Editar componentes en `src/components/`
4. **Testing**: Verificar en desarrollo antes de deploy

### Buenas Prácticas

- Mantener la estructura del JSON
- Usar variables CSS para colores
- Probar en móviles antes de publicar
- Verificar enlaces de WhatsApp y email

## 📞 Soporte

Para soporte técnico o dudas sobre el mantenimiento:

- **Email**: luis.espinoza.nav@outlook.com
- **WhatsApp**: +54 9 11 2388-1314

---

**¡Listo para crecer tu negocio con un sitio web profesional!** 🔥
