# 🔐 Configuración de Autenticación con Google en Firebase

## ✅ Lo que ya está implementado

1. ✅ **Google Sign-In** - Botón de autenticación con Google en la página de login
2. ✅ **AuthContext** - Contexto de React para manejar autenticación
3. ✅ **Integración con Firebase Auth** - Completamente funcional

## 📋 Configuración necesaria en Firebase Console

### Paso 1: Habilitar Google como proveedor de autenticación

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **ginger-6dba3**
3. Ve a **Authentication** en el menú lateral
4. Haz clic en la pestaña **Sign-in method**
5. Haz clic en **Google**
6. Habilita el toggle **Enable**
7. Configura el **Support email** (puede ser tu email o uno de soporte)
8. Haz clic en **Save**

### Paso 2: Configurar dominios autorizados (para producción)

1. En la misma sección de **Authentication**, ve a **Settings**
2. En **Authorized domains**, asegúrate de tener:
   - `localhost` (para desarrollo)
   - `ginbriexpress.shop` (tu dominio de producción)
   - Cualquier otro dominio donde se desplegará la app

### Paso 3: Crear usuario admin en Firebase

Para que el usuario admin pueda iniciar sesión con Google:

1. Ve a **Authentication** → **Users**
2. Haz clic en **Add user**
3. Ingresa el email: `admin@ginbristore.com`
4. Selecciona "Google" como proveedor (si usas Google Sign-In)
   - O usa "Email/Password" si prefieres el método tradicional
5. Guarda el usuario

### Alternativa: Usar el mismo email de Google

Si tu cuenta de Google es `admin@ginbristore.com`:
- Simplemente inicia sesión con Google usando esa cuenta
- El sistema verificará que el email sea `admin@ginbristore.com`

## 🔒 Seguridad

### Actual: Verificación por email

Actualmente, el sistema verifica que el email sea `admin@ginbristore.com` para otorgar acceso de admin.

### Recomendación: Usar Custom Claims (Futuro)

Para mayor seguridad, se recomienda usar Firebase Custom Claims:

1. Crear una Cloud Function que asigne el claim `admin: true` a usuarios específicos
2. Actualizar el código para verificar `user.token.claims.admin === true` en lugar del email

Ejemplo de Cloud Function:
```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.setAdminClaim = functions.auth.user().onCreate(async (user) => {
  if (user.email === 'admin@ginbristore.com') {
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
  }
});
```

## 🧪 Probar Autenticación

### Opción 1: Email/Password
1. Ve a `/admin/login`
2. Ingresa: `admin@ginbristore.com` / `admin123`
3. Haz clic en "Iniciar Sesión"

### Opción 2: Google Sign-In
1. Ve a `/admin/login`
2. Haz clic en "Continuar con Google"
3. Selecciona la cuenta de Google con email `admin@ginbristore.com`
4. Acepta los permisos

## ⚠️ Notas Importantes

- **Email debe coincidir**: Para que funcione como admin, el email debe ser exactamente `admin@ginbristore.com`
- **Primera vez con Google**: Si es la primera vez que usas Google Sign-In, Firebase creará automáticamente el usuario
- **Dominios autorizados**: Asegúrate de que tu dominio esté en la lista de dominios autorizados en Firebase

## 🚀 Próximos Pasos (Opcional)

- [ ] Implementar Custom Claims para mayor seguridad
- [ ] Agregar más métodos de autenticación (Facebook, Twitter, etc.)
- [ ] Implementar recuperación de contraseña mejorada
- [ ] Agregar 2FA (Two-Factor Authentication)

---

**¡Listo!** Una vez que habilites Google en Firebase Console, la autenticación con Google funcionará automáticamente. 🎉

