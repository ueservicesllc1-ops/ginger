const fs = require('fs');
const path = require('path');

// Script para preparar el build de Next.js para Capacitor
// Crea un index.html en la raíz de 'out' que redirige a la app

const outDir = path.join(__dirname, '..', 'out');
const indexHtmlPath = path.join(outDir, 'index.html');

// Verificar si existe server/app/index.html
const serverIndexPath = path.join(outDir, 'server', 'app', 'index.html');

let htmlContent = '';

if (fs.existsSync(serverIndexPath)) {
  // Leer el HTML generado por Next.js
  htmlContent = fs.readFileSync(serverIndexPath, 'utf-8');
} else {
  // Crear un HTML básico si no existe
  htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#000000">
    <title>Ginbri Store</title>
    <script>
        // Redirigir a la app principal
        window.location.href = '/';
    </script>
</head>
<body>
    <div id="__next">
        <div>Loading...</div>
    </div>
</body>
</html>`;
}

// Escribir index.html en la raíz de out
fs.writeFileSync(indexHtmlPath, htmlContent, 'utf-8');

console.log('✅ index.html creado en out/');
console.log('📱 Ahora puedes ejecutar: npx cap sync ios');

