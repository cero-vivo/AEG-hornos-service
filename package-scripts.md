# Scripts de Ambientes

## Cómo iniciar en cada ambiente

### Desarrollo
```bash
# Inicia automáticamente en modo desarrollo
npm run dev

# O manualmente con NODE_ENV
NODE_ENV=development npm run dev
```

### Producción
```bash
# Build para producción
npm run build

# Luego inicia en modo producción
npm start

# O manualmente con NODE_ENV
NODE_ENV=production npm start
```

### Verificar ambiente actual
```bash
# Verificar qué ambiente está activo
node -e "console.log('Ambiente:', process.env.NODE_ENV || 'development')"

# Verificar configuración completa
node check-environments.js
```

## Archivos de configuración

- **Desarrollo**: Usa `.env.local` con variables de desarrollo
- **Producción**: Usa `.env.local` con variables de producción

## Ejemplos de uso

### Para desarrollo:
1. Copia `.env.development.example` a `.env.local`
2. Ejecuta: `npm run dev`

### Para producción:
1. Copia `.env.production.example` a `.env.local`  
2. Ejecuta: `npm run build && npm start`