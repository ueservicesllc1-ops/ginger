const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconSizes = [
  72, 96, 128, 144, 152, 180, 192, 384, 512
];

const iconPath = path.join(__dirname, '..', 'public', 'images', 'icono.png');
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Crear directorio de iconos
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

async function generateIcons() {
  try {
    // Verificar que existe el icono
    if (!fs.existsSync(iconPath)) {
      console.error('❌ Icono no encontrado en:', iconPath);
      process.exit(1);
    }

    console.log('🔄 Generando iconos desde icono.png...\n');

    // Generar cada tamaño de icono
    for (const size of iconSizes) {
      const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
      
      await sharp(iconPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generado: icon-${size}x${size}.png`);
    }

    console.log('\n🎉 ¡Todos los iconos generados exitosamente!');
    console.log('📁 Ubicación: public/icons/');
    
  } catch (error) {
    console.error('❌ Error generando iconos:', error.message);
    
    // Si Sharp no está disponible, mostrar instrucciones
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('\n📝 Instalando Sharp...');
      console.log('   Ejecuta: npm install --save-dev sharp');
    }
    
    process.exit(1);
  }
}

generateIcons();
