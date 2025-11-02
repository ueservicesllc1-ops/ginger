# 📧 Configuración Rápida de EmailJS

## ✅ Credenciales Configuradas

Tu **Public Key** ya está configurada en `.env.local`:
```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=qiQ8ePjd70mK3bNGD
```

## 📋 Próximos Pasos

### 1. Obtener Service ID

1. Ve a https://www.emailjs.com/dashboard
2. Haz clic en **"Email Services"**
3. Si ya tienes un servicio configurado, copia su **Service ID**
4. Si no, crea uno nuevo:
   - Haz clic en **"Add New Service"**
   - Selecciona tu proveedor (Gmail, Outlook, etc.)
   - Sigue las instrucciones para conectar
   - Copia el **Service ID** (ej: `service_abc123`)

### 2. Crear Template

1. Ve a **"Email Templates"** en el dashboard
2. Haz clic en **"Create New Template"**
3. **Nombre:** `Confirmación Cita Personal Shopper`
4. **Subject:** `Confirmación de Cita - Ginbri Store Personal Shopper`
5. **Content:** Copia el HTML del archivo `emailjs-template.html` o usa la versión simple del archivo `EMAILJS_TEMPLATE_GUIDE.md`

### 3. Variables de la Plantilla

Asegúrate de usar estas variables en tu plantilla:
- `{{customer_name}}`
- `{{customer_email}}`
- `{{customer_phone}}`
- `{{appointment_date}}`
- `{{appointment_time}}`
- `{{appointment_hours}}`
- `{{total_price}}`
- `{{payment_method}}`
- `{{notes}}`

### 4. Obtener Template ID

Después de guardar la plantilla, copia el **Template ID** (ej: `template_xyz789`)

### 5. Completar .env.local

Edita el archivo `.env.local` y completa estas líneas:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id_aqui
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
```

### 6. Reiniciar el Servidor

```bash
# Detén el servidor (Ctrl+C)
npm run dev
```

## 🧪 Probar

Después de completar la configuración, realiza una cita de prueba para verificar que el correo se envía correctamente.

## 📄 Archivos de Referencia

- `emailjs-template.html` - Plantilla HTML completa
- `EMAILJS_TEMPLATE_GUIDE.md` - Guía detallada de la plantilla
- `EMAILJS_SETUP.md` - Instrucciones generales de EmailJS

