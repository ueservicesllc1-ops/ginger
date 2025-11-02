# Configuración de EmailJS

## Pasos para configurar EmailJS

### 1. Crear cuenta en EmailJS
1. Ve a https://www.emailjs.com/
2. Crea una cuenta gratuita
3. Verifica tu correo electrónico

### 2. Configurar servicio de correo
1. En el dashboard, ve a "Email Services"
2. Agrega un servicio (Gmail, Outlook, etc.)
3. Sigue las instrucciones para conectar tu cuenta de correo
4. Copia el **Service ID**

### 3. Crear plantilla de correo
1. Ve a "Email Templates"
2. Crea una nueva plantilla
3. Usa estos nombres de variables en la plantilla:
   - `{{customer_name}}` - Nombre del cliente
   - `{{customer_email}}` - Email del cliente
   - `{{customer_phone}}` - Teléfono del cliente
   - `{{appointment_date}}` - Fecha de la cita (formato: YYYY-MM-DD)
   - `{{appointment_time}}` - Horarios de la cita
   - `{{appointment_hours}}` - Número de horas
   - `{{total_price}}` - Precio total
   - `{{payment_method}}` - Método de pago
   - `{{notes}}` - Notas adicionales

**Ejemplo de plantilla:**
```
Hola {{customer_name}},

Tu cita con Personal Shopper ha sido confirmada exitosamente.

Detalles de la cita:
- Fecha: {{appointment_date}}
- Horarios: {{appointment_time}}
- Duración: {{appointment_hours}} hora(s)
- Total pagado: {{total_price}}
- Método de pago: {{payment_method}}
{% if notes != "N/A" %}
- Notas: {{notes}}
{% endif %}

Nos vemos pronto!

Equipo Ginbri Store
```

4. Copia el **Template ID**

### 4. Obtener Public Key
1. Ve a "Account" > "General"
2. Copia tu **Public Key**

### 5. Configurar variables de entorno
Agrega estas variables a tu archivo `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
```

### 6. Reiniciar el servidor
Después de agregar las variables de entorno, reinicia el servidor:
```bash
npm run dev
```

## Notas importantes
- El plan gratuito de EmailJS permite hasta 200 correos por mes
- Las variables deben empezar con `NEXT_PUBLIC_` para ser accesibles en el cliente
- El correo se envía automáticamente después de que se crea la cita exitosamente
- Si el envío de correo falla, no se bloquea el proceso de creación de la cita

