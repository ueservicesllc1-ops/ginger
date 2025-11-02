# Plantilla de EmailJS para Confirmación de Citas

## 📋 Pasos para Configurar la Plantilla

### 1. Acceder a EmailJS
1. Ve a https://www.emailjs.com/
2. Inicia sesión en tu cuenta
3. Ve a **"Email Templates"** en el menú lateral

### 2. Crear Nueva Plantilla
1. Haz clic en **"Create New Template"**
2. Dale un nombre: `Confirmación de Cita Personal Shopper`

### 3. Configurar el Contenido

**Asunto del correo (Subject):**
```
Confirmación de Cita - Ginbri Store Personal Shopper
```

**Contenido (Content):**
Copia y pega el contenido del archivo `emailjs-template.html` (puedes copiar solo el body si prefieres HTML simple)

### 4. Variables a Usar en la Plantilla

Asegúrate de que la plantilla incluya estas variables exactamente como se muestran:

- `{{customer_name}}` - Nombre del cliente
- `{{customer_email}}` - Email del cliente  
- `{{customer_phone}}` - Teléfono del cliente
- `{{appointment_date}}` - Fecha de la cita (formato: YYYY-MM-DD)
- `{{appointment_time}}` - Horarios seleccionados (ej: "09:00, 10:00, 11:00")
- `{{appointment_hours}}` - Número de horas (ej: "2")
- `{{total_price}}` - Precio total (ej: "$50.00 USD")
- `{{payment_method}}` - Método de pago (paypal, transferencia, zelle)
- `{{notes}}` - Notas adicionales (puede ser "N/A" si no hay notas)

### 5. Versión Simple (Texto Plano)

Si prefieres una versión más simple en texto plano, usa esta:

```
Hola {{customer_name}},

Tu cita con nuestro Personal Shopper ha sido confirmada exitosamente.

Detalles de tu Cita:
- Fecha: {{appointment_date}}
- Horarios: {{appointment_time}}
- Duración: {{appointment_hours}} hora(s)
- Total Pagado: {{total_price}}
- Método de Pago: {{payment_method}}
{% if notes != "N/A" and notes != "" %}
- Notas: {{notes}}
{% endif %}

Tu Información de Contacto:
- Email: {{customer_email}}
- Teléfono: {{customer_phone}}

Si necesitas hacer algún cambio o cancelar tu cita, por favor contáctanos con al menos 24 horas de anticipación.

¡Esperamos verte pronto!

Saludos cordiales,
Equipo Ginbri Store

---
Este es un correo automático. Por favor, no respondas directamente a este mensaje.
© 2024 Ginbri Store. Todos los derechos reservados.
Powered and designed by Freedom Labs
```

### 6. Guardar la Plantilla
1. Haz clic en **"Save"**
2. Copia el **Template ID** que se muestra (ej: `template_abc123xyz`)

### 7. Configurar Variables de Entorno

Agrega estas variables a tu archivo `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id (el que copiaste arriba)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
```

### 8. Notas Importantes

- **EmailJS usa sintaxis de template engines** (similar a Jinja2)
- La condición `{% if notes != "N/A" and notes != "" %}` mostrará las notas solo si existen
- Las variables deben estar exactamente como se muestra (case-sensitive)
- El `{{total_price}}` ya viene formateado como "$50.00 USD"
- El `{{payment_method}}` viene en minúsculas: "paypal", "transferencia", "zelle"

### 9. Probar la Plantilla

Puedes usar el botón **"Send Test Email"** en EmailJS para probar la plantilla con datos de ejemplo antes de usar en producción.

