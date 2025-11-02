# 📱 Configuración PWA para iPhone - Ginbri Store

## ✅ Lo que ya está configurado

1. ✅ **Manifest.json** - Configurado con todos los metadatos
2. ✅ **Meta tags iOS** - Configurados en layout.tsx
3. ✅ **Service Worker** - Básico implementado
4. ✅ **Componente PWAInstaller** - Banner para instalar la app

## 🎯 Instrucciones para Instalar en iPhone

### Método 1: Instalación desde Safari

1. **Abre la app en Safari** (no en Chrome):
   ```
   https://ginbriexpress.shop
   ```

2. **Toca el botón "Compartir"** (cuadrado con flecha hacia arriba) en la barra inferior

3. **Desplázate y selecciona "Añadir a pantalla de inicio"**

4. **Personaliza el nombre** (opcional) y toca "Añadir"

5. **¡Listo!** La app aparecerá en tu pantalla de inicio con un icono

### Método 2: Desde el Banner de Instalación

Si aparece el banner de instalación en la parte inferior:
1. Toca el botón **"Instalar"**
2. Se mostrarán las instrucciones paso a paso

## 🔧 Generar Iconos

Para que la app tenga iconos personalizados, necesitas crear iconos desde el logo:

### Opción A: Herramienta Online (Recomendado)

1. Ve a https://realfavicongenerator.net/
2. Sube tu logo (`/public/images/logo.png`)
3. Descarga el paquete de iconos
4. Extrae los iconos a `/public/icons/`

### Opción B: Script Automático (requiere Sharp)

```bash
npm install --save-dev sharp
```

Luego ejecuta:
```bash
node scripts/generate-icons.js
```

### Tamaños de Iconos Necesarios

Coloca estos archivos en `/public/icons/`:

- `icon-72x72.png` (72x72 px)
- `icon-96x96.png` (96x96 px)
- `icon-128x128.png` (128x128 px)
- `icon-144x144.png` (144x144 px)
- `icon-152x152.png` (152x152 px) - **Importante para iOS**
- `icon-180x180.png` (180x180 px) - **Importante para iOS**
- `icon-192x192.png` (192x192 px)
- `icon-384x384.png` (384x384 px)
- `icon-512x512.png` (512x512 px)

## ✨ Características PWA Activadas

- ✅ **Instalable** - Puede instalarse como app nativa
- ✅ **Standalone Mode** - Se abre sin barra del navegador
- ✅ **Offline Support** - Service Worker básico implementado
- ✅ **App Shortcuts** - Accesos directos a Productos, Personal Shopper y Carrito
- ✅ **Safe Area Support** - Compatible con iPhone notch

## 🧪 Probar PWA

### En Desarrollo Local

1. Inicia el servidor:
   ```bash
   npm run dev
   ```

2. Abre en Safari (iOS):
   - Visita `http://tu-ip-local:3000`
   - O usa un túnel (ngrok, etc.)

### En Producción (Railway)

1. Visita: `https://ginger-production-26da.up.railway.app`
2. Deberías ver el banner de instalación
3. O usa el botón de compartir de Safari

## 📋 Checklist de Instalación

- [ ] App cargada en Safari (iOS)
- [ ] Banner de instalación visible
- [ ] Iconos generados y colocados en `/public/icons/`
- [ ] Manifest.json accesible en `/manifest.json`
- [ ] Service Worker registrado (verificar en DevTools)
- [ ] App instalada en pantalla de inicio
- [ ] App abre en modo standalone (sin Safari UI)

## 🔍 Verificar PWA

1. Abre DevTools en Safari (desde Mac conectado al iPhone)
2. Ve a la pestaña "Application"
3. Verifica:
   - ✅ Manifest cargado
   - ✅ Service Worker activo
   - ✅ Iconos disponibles

## 🎨 Personalización

### Cambiar Nombre de la App

Edita `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Tu Nombre Aquí",
  // ...
};
```

### Cambiar Color del Theme

Edita `app/layout.tsx`:
```typescript
export const viewport: Viewport = {
  themeColor: '#TU_COLOR',
};
```

Y en `manifest.json`:
```json
{
  "theme_color": "#TU_COLOR"
}
```

## 🚀 Mejoras Futuras

- [ ] Service Worker más robusto con estrategias de cache
- [ ] Push Notifications
- [ ] Background Sync
- [ ] Share Target API

---

**¡Listo para instalar!** Solo necesitas abrir la app en Safari iOS y usar "Añadir a pantalla de inicio" 🎉

