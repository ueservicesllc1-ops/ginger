// Script para generar iconos PWA desde el logo
// Este script crea los iconos necesarios para PWA
// Nota: Requiere ImageMagick o Sharp. Por ahora, solo crea estructura.

const fs = require('fs');
const path = require('path');

const iconSizes = [
  { size: 72, name: 'icon-72x72.png' },
  { size: 96, name: 'icon-96x96.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 144, name: 'icon-144x144.png' },
  { size: 152, name: 'icon-152x152.png' },
  { size: 180, name: 'icon-180x180.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 384, name: 'icon-384x384.png' },
  { size: 512, name: 'icon-512x512.png' },
];

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
const logoPath = path.join(__dirname, '..', 'public', 'images', 'logo.png');

// Crear directorio de iconos
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
  console.log('✅ Directorio de iconos creado');
}

// Verificar si existe el logo
if (!fs.existsSync(logoPath)) {
  console.log('⚠️  Logo no encontrado en:', logoPath);
  console.log('📝 Por favor, crea los iconos manualmente desde el logo:');
  iconSizes.forEach(({ size, name }) => {
    console.log(`   - ${name} (${size}x${size})`);
  });
  console.log('');
  console.log('💡 Puedes usar herramientas online como:');
  console.log('   - https://realfavicongenerator.net/');
  console.log('   - https://www.pwabuilder.com/imageGenerator');
} else {
  console.log('✅ Logo encontrado');
  console.log('📝 Generando iconos...');
  console.log('   Para generar automáticamente, instala Sharp:');
  console.log('   npm install --save-dev sharp');
  console.log('');
  console.log('   O usa una herramienta online:');
  console.log('   - https://realfavicongenerator.net/');
}

console.log('');
console.log('📱 Tamaños de iconos necesarios:');
iconSizes.forEach(({ size, name }) => {
  console.log(`   ✓ ${name} - ${size}x${size}px`);
});

