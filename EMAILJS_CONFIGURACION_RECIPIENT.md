# 📧 Configuración del Destinatario en EmailJS

## ❌ Problema
El correo se está enviando al dueño de la cuenta de EmailJS en lugar del cliente.

## ✅ Solución

### Opción 1: Configurar en la Plantilla de EmailJS (RECOMENDADO)

1. Ve a tu plantilla en EmailJS Dashboard
2. Busca el campo **"To Email"** o **"Recipient"** en la configuración de la plantilla
3. Debe estar configurado como: `{{to_email}}` o `{{customer_email}}`
4. **NO debe estar configurado** con una dirección fija como `tu@email.com`

**Configuración correcta:**
- **To Email:** `{{to_email}}` 
- **To Name:** `{{to_name}}` o `{{customer_name}}`

### Opción 2: Verificar Variables en el Código

El código ya está enviando `to_email` y `to_name` correctamente:
```javascript
templateParams = {
  to_name: data.customerName,
  to_email: data.customerEmail,
  customer_name: data.customerName,
  customer_email: data.customerEmail,
  // ... más variables
}
```

## 📝 Pasos Detallados

### En EmailJS Dashboard:

1. Abre tu plantilla
2. Busca la sección **"Settings"** o **"To Email"**
3. Cambia de una dirección fija a la variable: `{{to_email}}`
4. Si usas "To Name", pon: `{{to_name}}` o `{{customer_name}}`
5. Guarda los cambios

### Variables Disponibles:

- `{{to_email}}` - Email del destinatario (cliente)
- `{{to_name}}` - Nombre del destinatario (cliente)
- `{{customer_email}}` - Email del cliente (alternativa)
- `{{customer_name}}` - Nombre del cliente (alternativa)

## ⚠️ Importante

- El campo "To Email" en la plantilla DEBE usar una variable, NO una dirección fija
- La variable `{{to_email}}` será reemplazada por el email del cliente automáticamente
- Si dejas una dirección fija, todos los correos irán a esa dirección

