# 🚂 Configuración de Variables de Entorno en Railway

## 📋 Variables Requeridas

Copia y pega estas variables en la configuración de Railway:

### 🔑 Variables Críticas (Obligatorias)

```json
{
  "NEXT_PUBLIC_PAYPAL_CLIENT_ID": "AcSfnCDBnACHCS6xuGjLK0T8gBbUtagLWdDEv1MJ_xEF-yEgmifsj2PbsrUrIHmVxrKlOUqB-0cRx6U9",
  "PAYPAL_CLIENT_SECRET": "EFl9MzdSXFoNIsUZmyk5OVQfNP4asAfKSI3E8mGRSb56uleu7C8K7b0vwUS-oft-uDEltPoQkUYxPArU",
  "PAYPAL_MODE": "sandbox",
  "NEXT_PUBLIC_APP_URL": "https://tu-app.railway.app",
  "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY": "qiQ8ePjd70mK3bNGD",
  "NEXT_PUBLIC_EMAILJS_SERVICE_ID": "service_1y0786u",
  "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID": "tu_template_id_aqui",
  "B2_KEY_ID": "005c2b526be0baa0000000020",
  "B2_APPLICATION_KEY": "K005TfRBBxUbg1A+kd7ueV0H7UbttwA",
  "B2_BUCKET_NAME": "ginger"
}
```

### 📝 Variables Opcionales

```json
{
  "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY": "tu_google_maps_api_key_si_lo_tienes"
}
```

## 🚀 Pasos para Configurar en Railway

### 1. Acceder a Railway
1. Ve a [railway.app](https://railway.app)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto o crea uno nuevo

### 2. Agregar Variables de Entorno
1. En tu proyecto, ve a la pestaña **"Variables"**
2. Haz clic en **"New Variable"** o **"Add Variable"**
3. Para cada variable:
   - **Key**: El nombre de la variable (ej: `NEXT_PUBLIC_PAYPAL_CLIENT_ID`)
   - **Value**: El valor correspondiente

### 3. Variables Especiales a Configurar

#### `NEXT_PUBLIC_APP_URL`
**IMPORTANTE**: Después de desplegar en Railway, actualiza esta variable con la URL real de tu aplicación:
- Ve a **Settings** > **Domains** en Railway
- Copia la URL que te proporciona (ej: `https://ginger-production.up.railway.app`)
- Actualiza `NEXT_PUBLIC_APP_URL` con esa URL

#### `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- Debes tener creada la plantilla en EmailJS
- Copia el Template ID desde EmailJS Dashboard
- Agrega el valor en Railway

#### `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (Opcional)
- Solo si usas la funcionalidad de mapas
- Obtén la clave desde [Google Cloud Console](https://console.cloud.google.com/)

## ⚠️ Notas Importantes

1. **Variables `NEXT_PUBLIC_*`**: Son públicas y se exponen al cliente. Está bien para PayPal Client ID y EmailJS Public Key.

2. **Variables Privadas**: `PAYPAL_CLIENT_SECRET` y `B2_APPLICATION_KEY` son secretas. No las expongas.

3. **Reinicio**: Después de agregar/modificar variables, Railway reinicia automáticamente tu aplicación.

4. **Para Producción**: 
   - Cambia `PAYPAL_MODE` de `sandbox` a `production`
   - Usa credenciales de producción de PayPal
   - Actualiza `NEXT_PUBLIC_APP_URL` con tu dominio final

## 📦 Archivo JSON Completo

El archivo `railway-env-variables.json` contiene todas las variables en formato JSON listo para importar (si Railway lo soporta) o para copiar manualmente.

