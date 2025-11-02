# 🔧 Solución: Variables de Entorno en Railway

## ⚠️ Error Actual
```
EmailJS no está configurado. Configura las variables de entorno necesarias.
```

Este error ocurre porque las variables de entorno no están configuradas en Railway.

## ✅ Solución: Agregar Variables en Railway

### Paso 1: Acceder a Variables en Railway
1. Ve a tu proyecto en [railway.app](https://railway.app)
2. Selecciona tu servicio/deployment
3. Ve a la pestaña **"Variables"** o **"Environment Variables"**

### Paso 2: Agregar Variables de EmailJS

Agrega estas tres variables (copia y pega exactamente):

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `qiQ8ePjd70mK3bNGD` |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_1y0786u` |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `tu_template_id_de_emailjs` |

### Paso 3: Verificar Otras Variables

Asegúrate de que estas también estén configuradas:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | `AcSfnCDBnACHCS6xuGjLK0T8gBbUtagLWdDEv1MJ_xEF-yEgmifsj2PbsrUrIHmVxrKlOUqB-0cRx6U9` |
| `PAYPAL_CLIENT_SECRET` | `EFl9MzdSXFoNIsUZmyk5OVQfNP4asAfKSI3E8mGRSb56uleu7C8K7b0vwUS-oft-uDEltPoQkUYxPArU` |
| `PAYPAL_MODE` | `sandbox` |
| `NEXT_PUBLIC_APP_URL` | `https://tu-url-de-railway.app` |
| `B2_KEY_ID` | `005c2b526be0baa0000000020` |
| `B2_APPLICATION_KEY` | `K005TfRBBxUbg1A+kd7ueV0H7UbttwA` |
| `B2_BUCKET_NAME` | `ginger` |

### Paso 4: Actualizar NEXT_PUBLIC_APP_URL

**MUY IMPORTANTE**: Después de desplegar:
1. Ve a **Settings** > **Domains** en Railway
2. Copia la URL que te proporciona (ej: `https://ginger-production.up.railway.app`)
3. Actualiza `NEXT_PUBLIC_APP_URL` con esa URL exacta

### Paso 5: Reiniciar el Deployment

Después de agregar las variables:
1. Railway debería reiniciar automáticamente
2. Si no, haz clic en **"Redeploy"** o **"Restart"**

## 📋 Checklist

- [ ] `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` agregada
- [ ] `NEXT_PUBLIC_EMAILJS_SERVICE_ID` agregada
- [ ] `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` agregada (con tu template ID real)
- [ ] `NEXT_PUBLIC_APP_URL` actualizada con la URL real de Railway
- [ ] Todas las demás variables agregadas
- [ ] Deployment reiniciado

## ⚠️ Nota sobre el Template ID

Si aún no tienes el Template ID de EmailJS:
1. Ve a [EmailJS Dashboard](https://www.emailjs.com/dashboard)
2. Ve a **"Email Templates"**
3. Crea o selecciona tu plantilla
4. Copia el **Template ID**
5. Agrega el valor en Railway

---

**Después de configurar las variables, el error debería desaparecer y el correo debería enviarse correctamente.**

