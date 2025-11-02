# Configuración de PayPal

## ⚠️ IMPORTANTE: Error "invalid_client"

Si estás viendo el error "Client Authentication failed", asegúrate de seguir estos pasos:

### 1. Crear/Editar archivo `.env.local`

El archivo debe estar en la raíz del proyecto `ginbri-express/` y debe contener:

```env
# PayPal Configuration (Sandbox)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AcSfnCDBnACHCS6xuGjLK0T8gBbUtagLWdDEv1MJ_xEF-yEgmifsj2PbsrUrIHmVxrKlOUqB-0cRx6U9
PAYPAL_CLIENT_SECRET=EFl9MzdSXFoNIsUZmyk5OVQfNP4asAfKSI3E8mGRSb56uleu7C8K7b0vwUS-oft-uDEltPoQkUYxPArU
PAYPAL_MODE=sandbox
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Verificar el formato

- **NO** debe haber espacios alrededor del signo `=`
- **NO** debe haber comillas alrededor de los valores
- Las variables deben estar exactamente como se muestra arriba

### 3. Reiniciar el servidor

Después de crear o modificar `.env.local`:

1. Detén el servidor (Ctrl+C)
2. Ejecuta: `npm run dev`
3. Vuelve a intentar

### 4. Verificar que las credenciales sean correctas

Las credenciales proporcionadas son:
- **Client ID**: `AcSfnCDBnACHCS6xuGjLK0T8gBbUtagLWdDEv1MJ_xEF-yEgmifsj2PbsrUrIHmVxrKlOUqB-0cRx6U9`
- **Client Secret**: `EFl9MzdSXFoNIsUZmyk5OVQfNP4asAfKSI3E8mGRSb56uleu7C8K7b0vwUS-oft-uDEltPoQkUYxPArU`

⚠️ **Si las credenciales no funcionan**, puede ser que:
- Las credenciales sean de producción y no de sandbox
- Las credenciales hayan expirado o sido revocadas
- Necesites generar nuevas credenciales en [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)

### 5. Probar la autenticación

Puedes probar las credenciales manualmente con este comando (desde PowerShell):

```powershell
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("CLIENT_ID:CLIENT_SECRET"))
Invoke-RestMethod -Uri "https://api-m.sandbox.paypal.com/v1/oauth2/token" -Method Post -Headers @{"Authorization"="Basic $auth"; "Content-Type"="application/x-www-form-urlencoded"} -Body "grant_type=client_credentials"
```

Reemplaza `CLIENT_ID` y `CLIENT_SECRET` con tus credenciales reales.

## Solución rápida

Si el problema persiste:

1. Verifica que `.env.local` exista en `ginbri-express/.env.local`
2. Verifica que las variables estén sin espacios ni comillas
3. **Reinicia el servidor completamente** (detén y vuelve a iniciar)
4. Verifica en la consola del navegador que no haya errores de carga

## Credenciales de ejemplo

Si necesitas crear nuevas credenciales:

1. Ve a https://developer.paypal.com/dashboard/
2. Apps & Credentials
3. Crea una nueva app o usa la existente
4. Copia el **Client ID** y **Secret** (este último solo se muestra una vez)
5. Actualiza `.env.local` con las nuevas credenciales
6. Reinicia el servidor
