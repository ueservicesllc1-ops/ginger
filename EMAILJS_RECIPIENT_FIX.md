# 🔧 Corrección: Email se envía al cliente

## ❌ Problema Actual
El correo se está enviando al dueño de la cuenta de EmailJS en lugar del cliente que llena el formulario.

## ✅ Solución: Configurar en EmailJS

### Paso 1: Editar la Plantilla
1. Ve a tu plantilla en EmailJS Dashboard
2. En la sección **"Settings"** o **"Recipient"**, busca:
   - **"Para correo electrónico"** o **"To Email"**

### Paso 2: Cambiar a Variable Dinámica
**EN VEZ DE:**
```
heavencoffee.us@gmail.com
```

**DEBE SER:**
```
{{to_email}}
```
o
```
{{customer_email}}
```

### Paso 3: Configurar Remitente (Opcional pero recomendado)
- **Nombre del remitente:** `Ginbri Store` o `{{to_name}}`
- **Correo electrónico del remitente:** `heavencoffee.us@gmail.com` (tu cuenta)

Esto hará que:
- El correo se envíe **AL CLIENTE** (usando `{{to_email}}`)
- El remitente sea tu cuenta de Gmail

### Paso 4: Guardar
Guarda los cambios en la plantilla.

## 📝 Nota Importante
EmailJS ya está enviando la variable `to_email` con el email del cliente, solo necesitas configurarlo en la plantilla de EmailJS para que use esa variable en lugar del email fijo.

