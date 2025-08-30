#!/usr/bin/env node

/**
 * Script para verificar la configuración de ambientes
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de ambientes...\n');

// Verificar archivos de configuración
const configFiles = [
  'src/config/environments.ts',
  '.env.development.example',
  '.env.production.example',
  'ENVIRONMENTS_SETUP.md'
];

configFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - No encontrado`);
  }
});

// Verificar variables de entorno
console.log('\n🔧 Variables de entorno actuales:');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'No configurado'}`);
console.log(`RESEND_API_KEY: ${process.env.RESEND_API_KEY ? 'Configurado' : 'No configurado'}`);

// Verificar archivo .env.local
const envLocalPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  console.log('\n✅ Archivo .env.local encontrado');
} else {
  console.log('\n⚠️  Archivo .env.local no encontrado');
  console.log('   Copia .env.development.example a .env.local para desarrollo');
}

console.log('\n📋 Para verificar Remote Config:');
console.log('   - En desarrollo: se actualiza en tiempo real');
console.log('   - En producción: tiene caché de 1 hora');
console.log('\n🚀 Usa: npm run dev (desarrollo) o npm run build (producción)');