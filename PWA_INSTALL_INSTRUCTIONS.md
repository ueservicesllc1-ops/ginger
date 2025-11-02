# 📱 Instrucciones para Instalar PWA en iPhone

## ✅ La app ya está configurada como PWA

La aplicación **Ginbri Store** está lista para instalarse en tu iPhone como una Progressive Web App (PWA).

## 🚀 Pasos para Instalar

### Método 1: Desde Safari (Recomendado)

1. **Abre Safari en tu iPhone** (NO uses Chrome, Firefox u otros navegadores)

2. **Visita la URL de producción:**
   ```
   https://ginbriexpress.shop
   ```

3. **Toca el botón "Compartir"** 📤
   - Es el ícono cuadrado con una flecha hacia arriba en la barra inferior de Safari

4. **Desplázate hacia abajo** en el menú y toca:
   ```
   "Añadir a pantalla de inicio"
   ```

5. **Personaliza el nombre** (opcional):
   - Puedes cambiar el nombre si quieres
   - Por defecto será "Ginbri Store"

6. **Toca "Añadir"** en la esquina superior derecha

7. **¡Listo!** 🎉
   - La app aparecerá en tu pantalla de inicio con un icono
   - Se abrirá en modo standalone (sin barra del navegador)

### Método 2: Desde el Banner de Instalación

1. Abre la app en Safari
2. Si aparece un banner en la parte inferior pidiendo instalar, tócalo
3. Sigue las instrucciones que aparezcan

## 🎨 Agregar Iconos Personalizados (Opcional)

Actualmente, la app usará el icono por defecto. Para personalizar:

### Opción A: Generador Online (Más Fácil)

1. Ve a: **https://realfavicongenerator.net/**
2. Sube tu logo: `/public/images/logo.png`
3. Descarga el paquete de iconos
4. Extrae los archivos `.png` a la carpeta `/public/icons/`
5. Haz push y reinicia Railway

### Opción B: Redimensionar Manualmente

Usa cualquier editor de imágenes (Photoshop, GIMP, etc.) y crea estos archivos desde tu logo:

- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png` ⭐ (Importante para iOS)
- `icon-180x180.png` ⭐ (Importante para iOS)
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

Colócalos todos en: `/public/icons/`

## ✨ Características PWA

- ✅ **Instalable** - Funciona como app nativa
- ✅ **Standalone Mode** - Sin barras del navegador
- ✅ **Offline Support** - Service Worker para caché básico
- ✅ **App Shortcuts** - Accesos rápidos desde el icono
- ✅ **Safe Area** - Compatible con notch de iPhone

## 📋 Verificar Instalación

Una vez instalada:

1. ✅ El icono aparece en la pantalla de inicio
2. ✅ Al abrir, no se ve la barra de Safari
3. ✅ Funciona offline (caché básico)
4. ✅ Puedes mantener presionado el icono para ver accesos rápidos

## 🔧 Solución de Problemas

### No aparece "Añadir a pantalla de inicio"

- ✅ Asegúrate de estar en **Safari** (no Chrome)
- ✅ Visita la URL de **producción** (Railway), no localhost
- ✅ Verifica que la página cargue completamente

### El banner no aparece

- ✅ Espera unos segundos después de cargar la página
- ✅ El banner aparece automáticamente en dispositivos compatibles
- ✅ Si no aparece, usa el método manual de compartir

### La app no se abre en modo standalone

- ✅ Elimina la app instalada
- ✅ Vuelve a instalarla desde Safari
- ✅ Verifica que los meta tags estén correctos

## 🎯 URL de Producción

**https://ginbriexpress.shop**

¡Abre esta URL en Safari iOS y sigue los pasos arriba! 🚀

