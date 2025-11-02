// Script para verificar configuración de PayPal
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');

console.log('\n🔍 Verificando configuración de PayPal...\n');

if (!fs.existsSync(envPath)) {
  console.error('❌ Archivo .env.local NO existe');
  console.log('\n📝 Crea el archivo .env.local en la raíz del proyecto con:');
  console.log('\nNEXT_PUBLIC_PAYPAL_CLIENT_ID=AcSfnCDBnACHCS6xuGjLK0T8gBbUtagLWdDEv1MJ_xEF-yEgmifsj2PbsrUrIHmVxrKlOUqB-0cRx6U9');
  console.log('PAYPAL_CLIENT_SECRET=EFl9MzdSXFoNIsUZmyk5OVQfNP4asAfKSI3E8mGRSb56uleu7C8K7b0vwUS-oft-uDEltPoQkUYxPArU');
  console.log('PAYPAL_MODE=sandbox');
  console.log('NEXT_PUBLIC_APP_URL=http://localhost:3000\n');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const lines = envContent.split('\n');

const paypalVars = {
  'NEXT_PUBLIC_PAYPAL_CLIENT_ID': false,
  'PAYPAL_CLIENT_SECRET': false,
  'PAYPAL_MODE': false,
};

let foundVars = {};

lines.forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=').trim();
    if (key && paypalVars.hasOwnProperty(key)) {
      foundVars[key] = value;
      paypalVars[key] = true;
    }
  }
});

console.log('📋 Variables de PayPal:\n');
Object.entries(paypalVars).forEach(([key, found]) => {
  const status = found ? '✅' : '❌';
  const value = foundVars[key];
  const displayValue = key === 'PAYPAL_CLIENT_SECRET' 
    ? value ? `${value.substring(0, 10)}...` 
    : 'NO CONFIGURADA'
    : value || 'NO CONFIGURADA';
  console.log(`${status} ${key} = ${displayValue}`);
});

const allOk = Object.values(paypalVars).every(v => v);

if (allOk) {
  console.log('\n✅ Todas las variables están configuradas');
  console.log('\n⚠️  IMPORTANTE: Si aún ves errores:');
  console.log('   1. Verifica que las credenciales sean de SANDBOX (no producción)');
  console.log('   2. Reinicia el servidor: Ctrl+C y luego npm run dev');
  console.log('   3. Verifica que no haya espacios extra en .env.local\n');
} else {
  console.log('\n❌ Faltan algunas variables. Revisa .env.local\n');
  process.exit(1);
}

