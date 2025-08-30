# Scripts de Ambientes Actualizados

## Uso simplificado:

### Desarrollo
```bash
npm run dev
# Copia automáticamente .env.development.example → .env.local
# Inicia en modo desarrollo
```

### Producción
```bash
npm run prod
# Copia automáticamente .env.production.example → .env.local
# Build y start en modo producción
```

### Verificar configuración
```bash
npm run env:check
```

## Comandos anteriores reemplazados:

| Comando Anterior | Nuevo Comando |
|------------------|---------------|
| `cp .env.development.example .env.local && npm run dev` | `npm run dev` |
| `cp .env.production.example .env.local && npm run build && npm start` | `npm run prod` |

## Notas:
- Los archivos .env se copian automáticamente
- No necesitas ejecutar comandos separados
- El ambiente se configura automáticamente según el script