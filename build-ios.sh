#!/bin/bash

# Script para construir la app para iOS
# Ejecutar en Mac con: bash build-ios.sh

echo "🚀 Iniciando build para iOS..."

# Configurar variable de entorno para export estático
export CAPACITOR_BUILD=true

# Instalar dependencias si es necesario
echo "📦 Verificando dependencias..."
npm install

# Build de Next.js
echo "🔨 Construyendo Next.js..."
npm run build

# Sincronizar con Capacitor
echo "🔄 Sincronizando con Capacitor iOS..."
npx cap sync ios

# Instalar pods de iOS
echo "🍎 Instalando CocoaPods..."
cd ios/App
pod install
cd ../..

echo "✅ Build completado!"
echo ""
echo "📱 Para abrir en Xcode:"
echo "   npm run cap:ios"
echo ""
echo "O manualmente:"
echo "   open ios/App/App.xcworkspace"

