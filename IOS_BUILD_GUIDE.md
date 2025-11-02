# 📱 Guía para Compilar la App iOS - Ginbri Store

## ⚠️ Requisitos Previos

Para compilar la aplicación iOS, **necesitas un Mac con macOS** y Xcode instalado. No es posible compilar aplicaciones iOS desde Windows sin servicios cloud adicionales.

### Requisitos:
1. **macOS** (cualquier versión reciente)
2. **Xcode** (la versión más reciente desde App Store)
3. **CocoaPods** (se instala automáticamente con Capacitor)
4. **Cuenta de Desarrollador de Apple** (gratuita para desarrollo, $99/año para distribución)

---

## 🚀 Pasos para Compilar

### Paso 1: Preparar el Proyecto en Windows

En tu máquina Windows, ya hemos preparado el build. Solo necesitas:

```bash
cd ginbri-express
npm run build
npm run cap:sync
```

Esto creará la carpeta `out/` y sincronizará con Capacitor.

### Paso 2: Transferir a Mac

1. **Subir a GitHub** (ya hecho):
   ```bash
   git add .
   git commit -m "Prepared for iOS build"
   git push origin master
   ```

2. **Clonar en Mac**:
   ```bash
   git clone https://github.com/ueservicesllc1-ops/ginger.git
   cd ginger/ginbri-express
   npm install
   ```

### Paso 3: Sincronizar con iOS

```bash
# Instalar dependencias si faltan
npm install

# Build y sincronización
npm run build
npm run cap:sync
```

Esto actualizará la carpeta `ios/` con el último código.

### Paso 4: Abrir en Xcode

```bash
npm run cap:ios
```

O manualmente:
```bash
npx cap open ios
```

Esto abrirá el proyecto en Xcode.

### Paso 5: Configurar en Xcode

1. **Abrir el Workspace**:
   - Abre `ios/App/App.xcworkspace` (NO el .xcodeproj)

2. **Seleccionar el Target**:
   - En la barra superior, selecciona "App" como target
   - Selecciona un simulador iOS o un dispositivo físico

3. **Configurar Signing & Capabilities**:
   - Selecciona el proyecto "App" en el navegador izquierdo
   - Ve a la pestaña "Signing & Capabilities"
   - Selecciona tu "Team" (cuenta de Apple Developer)
   - Xcode generará automáticamente un Bundle Identifier

4. **Ajustar Bundle Identifier** (si es necesario):
   - El Bundle ID actual es: `com.ginbri.express`
   - Puedes cambiarlo en `capacitor.config.ts` si necesitas uno único

### Paso 6: Compilar y Ejecutar

1. **Para Simulador**:
   - Selecciona un simulador iOS (ej: iPhone 14 Pro)
   - Presiona `Cmd + R` o haz clic en el botón "Play"

2. **Para Dispositivo Físico**:
   - Conecta tu iPhone/iPad vía USB
   - Confía en la computadora en el dispositivo
   - Selecciona tu dispositivo en Xcode
   - Presiona `Cmd + R`
   - Puede pedirte instalar un perfil de desarrollo en el dispositivo

### Paso 7: Crear Archivo IPA (Para Distribución)

Si quieres crear un archivo `.ipa` para distribución:

1. En Xcode, selecciona **Product > Archive**
2. Espera a que termine el archivo
3. Se abrirá el **Organizer**
4. Selecciona tu archivo y haz clic en **Distribute App**
5. Selecciona el método de distribución:
   - **App Store Connect**: Para publicar en App Store
   - **Ad Hoc**: Para distribución limitada (requiere UDIDs de dispositivos)
   - **Development**: Para instalación en dispositivos de desarrollo
   - **Enterprise**: Para distribución empresarial

---

## 📋 Configuración Actual

### Bundle ID
- `com.ginbri.express`

### Nombre de la App
- `Ginbri Store`

### Directorio Web
- `out/` (generado por Next.js build)

---

## 🔧 Solución de Problemas

### Error: "No podspec found"
```bash
cd ios/App
pod install
cd ../..
npm run cap:sync
```

### Error: "Missing iOS platform"
```bash
npx cap add ios
npm run cap:sync
```

### Error: Build fails en Xcode
1. Limpia el build: `Product > Clean Build Folder` (Cmd + Shift + K)
2. Elimina Derived Data
3. Re-sincroniza: `npm run cap:sync`
4. Reabre Xcode

### Error: Signing issues
- Asegúrate de tener una cuenta de Apple Developer configurada en Xcode
- Ve a Preferences > Accounts y agrega tu cuenta
- Selecciona tu Team en Signing & Capabilities

---

## 🌐 Servicios Alternativos (Sin Mac)

Si no tienes acceso a un Mac, puedes usar servicios cloud:

1. **MacStadium** - Alquila Macs en la nube
2. **GitHub Actions** - CI/CD con runners macOS
3. **CodeMagic** - Servicio de CI/CD para apps móviles
4. **AppCircle** - CI/CD con soporte iOS

---

## 📝 Notas Importantes

1. **Variables de Entorno**: Las variables `NEXT_PUBLIC_*` deben estar configuradas antes del build
2. **API URLs**: Asegúrate de que las URLs de API apunten a producción (Railway)
3. **Firebase**: La configuración de Firebase funciona igual en iOS
4. **Push Notifications**: Requiere configuración adicional de APNs
5. **App Store**: Publicar requiere cuenta de desarrollador de pago ($99/año)

---

## ✅ Checklist Pre-Build

- [ ] Build de Next.js completado (`npm run build`)
- [ ] Capacitor sincronizado (`npm run cap:sync`)
- [ ] Xcode instalado y actualizado
- [ ] Cuenta de Apple Developer configurada
- [ ] Bundle ID configurado correctamente
- [ ] Certificados de desarrollo/signature configurados
- [ ] Dispositivo o simulador seleccionado

---

## 🎯 Próximos Pasos

Después de compilar exitosamente:

1. **Testing**: Prueba todas las funcionalidades en iOS
2. **Optimización**: Ajusta para diferentes tamaños de pantalla
3. **Iconos y Splash**: Personaliza iconos y pantalla de inicio
4. **App Store**: Prepara metadatos para App Store Connect
5. **TestFlight**: Distribuye versión beta vía TestFlight

