# Script PowerShell para preparar build iOS desde Windows
# Nota: Este script solo prepara el proyecto. 
# Para compilar iOS necesitas un Mac con Xcode.

Write-Host "🚀 Preparando proyecto para iOS build..." -ForegroundColor Cyan

# Configurar variable de entorno para export estático
$env:CAPACITOR_BUILD = "true"

# Instalar dependencias
Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
npm install

# Build de Next.js con export estático
Write-Host "🔨 Construyendo Next.js para Capacitor..." -ForegroundColor Yellow
npm run build

# Verificar que el build se completó
if (Test-Path "out/index.html") {
    Write-Host "✅ Build completado correctamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Próximos pasos en Mac:" -ForegroundColor Cyan
    Write-Host "   1. Clonar el repo: git clone https://github.com/ueservicesllc1-ops/ginger.git" -ForegroundColor White
    Write-Host "   2. cd ginger/ginbri-express" -ForegroundColor White
    Write-Host "   3. npm install" -ForegroundColor White
    Write-Host "   4. npm run build" -ForegroundColor White
    Write-Host "   5. npx cap sync ios" -ForegroundColor White
    Write-Host "   6. cd ios/App && pod install && cd ../.." -ForegroundColor White
    Write-Host "   7. npx cap open ios" -ForegroundColor White
} else {
    Write-Host "⚠️  El build no generó index.html" -ForegroundColor Yellow
    Write-Host "   Esto puede requerir configuración adicional para Next.js export" -ForegroundColor Yellow
}

