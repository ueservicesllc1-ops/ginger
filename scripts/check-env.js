// Script para verificar variables de entorno
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local no existe');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const lines = envContent.split('\n');

const requiredVars = {
  'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY': false,
  'B2_KEY_ID': false,
  'B2_APPLICATION_KEY': false,
  'B2_BUCKET_NAME': false,
};

lines.forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key] = trimmed.split('=');
    if (key && requiredVars.hasOwnProperty(key)) {
      requiredVars[key] = true;
    }
  }
});

console.log('\n📋 Verificación de variables de entorno:\n');
let allOk = true;

Object.entries(requiredVars).forEach(([key, found]) => {
  const status = found ? '✅' : '❌';
  console.log(`${status} ${key}`);
  if (!found) allOk = false;
});

if (allOk) {
  console.log('\n✅ Todas las variables están configuradas');
  console.log('\n⚠️  Si aún ves errores, reinicia el servidor:');
  console.log('   1. Presiona Ctrl+C para detener el servidor');
  console.log('   2. Ejecuta: npm run dev\n');
} else {
  console.log('\n❌ Faltan algunas variables. Revisa .env.local\n');
  process.exit(1);
}


