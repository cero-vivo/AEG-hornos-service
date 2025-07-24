#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de variables de entorno...\n');

// Verificar si existe .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ No se encontró el archivo .env.local');
  console.log('📝 Crea el archivo .env.local en la raíz del proyecto con:');
  console.log('');
  console.log('RESEND_API_KEY=tu_api_key_de_resend');
  console.log('');
  process.exit(1);
}

console.log('✅ Archivo .env.local encontrado');

// Leer y verificar variables
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

console.log('\n📋 Variables encontradas:');

const requiredVars = [
  'RESEND_API_KEY'
];

let allGood = true;

requiredVars.forEach(varName => {
  const value = envVars[varName];
  if (value) {
    console.log(`✅ ${varName}: ${varName.includes('KEY') ? '***' + value.slice(-4) : value}`);
  } else {
    console.log(`❌ ${varName}: NO CONFIGURADA`);
    allGood = false;
  }
});

console.log('\n📝 Pasos para configurar Resend:');
console.log('1. Ve a https://resend.com y crea una cuenta gratuita');
console.log('2. En el dashboard, ve a "API Keys"');
console.log('3. Crea una nueva API Key');
console.log('4. Copia la key y agrégalo a tu .env.local');
console.log('5. Reinicia el servidor: npm run dev');
console.log('6. ¡Listo! Resend es plug-and-play');

if (allGood) {
  console.log('\n✅ Configuración parece correcta');
  console.log('🌐 Ve a http://localhost:3000/test-email para probar la conexión');
} else {
  console.log('\n❌ Faltan variables requeridas');
  process.exit(1);
} 