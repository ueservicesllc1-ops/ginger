# Ginbri Express

Aplicación multiplataforma de gestión de envíos desarrollada con Next.js y Capacitor.

## 🚀 Características

- ✅ **Web App** - Funciona en navegadores modernos
- ✅ **iOS App** - Empaquetada para App Store
- ✅ **Android App** - Empaquetada para Google Play
- ✅ **GPS y Geolocalización** - Obtener ubicación del usuario
- ✅ **Google Maps** - Visualización de mapas interactivos
- ✅ **Tracking con QR** - Generación de códigos QR para seguimiento
- ✅ **Firebase Firestore** - Base de datos para envíos y metadatos
- ✅ **Backblaze B2 Storage** - Almacenamiento de fotos y videos
- ✅ **Backend API** - API REST para gestión de envíos y archivos

## 📋 Requisitos Previos

- Node.js 18+ y npm
- Para iOS: Xcode (solo macOS)
- Para Android: Android Studio

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install
```

## 🏃 Desarrollo

### Desarrollo Web

```bash
# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui

# Backblaze B2 Storage
B2_KEY_ID=tu_key_id
B2_APPLICATION_KEY=tu_application_key
B2_BUCKET_NAME=ginger
```

## 📱 Sincronización con Capacitor

Después de hacer cambios en la aplicación web, sincroniza con las plataformas móviles:

### Opción 1: Sincronizar y abrir automáticamente

```bash
# Para iOS
npm run cap:ios

# Para Android
npm run cap:android
```

### Opción 2: Pasos manuales

```bash
# 1. Construir la aplicación
npm run build

# 2. Copiar archivos a las plataformas nativas
npx cap copy

# O sincronizar (recomendado - también actualiza dependencias)
npx cap sync

# 3. Abrir en IDE nativo
npx cap open ios      # Abre Xcode
npx cap open android  # Abre Android Studio
```

## 📦 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Iniciar servidor de producción
- `npm run lint` - Ejecutar ESLint
- `npm run cap:sync` - Construir y sincronizar con Capacitor
- `npm run cap:copy` - Construir y copiar archivos
- `npm run cap:ios` - Sincronizar y abrir iOS
- `npm run cap:android` - Sincronizar y abrir Android

## 🏗️ Estructura del Proyecto

```
ginbri-express/
├── app/
│   ├── api/
│   │   └── shipments/      # API REST para envíos
│   ├── layout.tsx          # Layout principal
│   └── page.tsx             # Página principal
├── components/
│   ├── Map.tsx              # Componente Google Maps
│   └── TrackingQR.tsx       # Componente QR Code
├── utils/
│   ├── geolocation.ts      # Utilidades GPS
│   └── shipments.ts         # Utilidades API envíos
├── types/
│   └── shipment.ts          # Tipos TypeScript
├── android/                 # Proyecto Android nativo
├── ios/                     # Proyecto iOS nativo
└── capacitor.config.ts      # Configuración Capacitor
```

## 🔌 Plugins de Capacitor Instalados

- `@capacitor/geolocation` - GPS y geolocalización
- `@capacitor/filesystem` - Sistema de archivos
- `@capacitor/camera` - Cámara para escanear QR

## 📡 API Endpoints

### Envíos (Shipments)

#### GET `/api/shipments`
Obtener todos los envíos

#### POST `/api/shipments`
Crear un nuevo envío
```json
{
  "fromAddress": "Dirección origen",
  "toAddress": "Dirección destino"
}
```

#### GET `/api/shipments/[id]`
Obtener un envío específico

#### PATCH `/api/shipments/[id]`
Actualizar el estado de un envío
```json
{
  "status": "in_transit" | "delivered" | "cancelled"
}
```

### Archivos (Upload)

#### POST `/api/upload`
Subir un archivo (foto o video)
- `file`: Archivo a subir
- `folder`: (opcional) Carpeta donde guardar
- `useLargeUpload`: (opcional) true para archivos grandes

#### GET `/api/upload/[file]`
Obtener un archivo (proxy con CORS)
- `folder`: (opcional) Carpeta del archivo

#### DELETE `/api/upload/[file]`
Eliminar un archivo
- `folder`: (opcional) Carpeta del archivo

## 🗄️ Base de Datos y Almacenamiento

### Firebase Firestore
- ✅ Configurado y funcionando
- ✅ Colección: `shipments`
- ✅ Datos persistentes en la nube

### Backblaze B2 Storage
- ✅ Configurado y funcionando
- ✅ Bucket: `ginger`
- ✅ Proxy CORS implementado
- ✅ Soporte para archivos grandes (multipart upload)
- ✅ URLs públicas para fotos y videos

## 🚀 Próximos Pasos

- [x] Firebase Firestore configurado
- [x] Backblaze B2 Storage configurado
- [ ] Implementar autenticación de usuarios
- [ ] Agregar notificaciones push
- [ ] Implementar escaneo de QR con cámara
- [ ] Agregar historial de ubicaciones en tiempo real

## 📝 Notas

- ✅ Los datos se guardan en Firebase Firestore (persistente)
- ✅ Los archivos (fotos/videos) se guardan en Backblaze B2 Storage
- ✅ El proxy de archivos maneja CORS automáticamente
- ⚠️ Asegúrate de tener permisos de ubicación configurados en `AndroidManifest.xml` y `Info.plist` para apps móviles
- ⚠️ Las credenciales de B2 están en `.env.local` - no las subas a git

## 📄 Licencia

MIT
