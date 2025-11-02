# Configuración de Reglas de Firestore

Este proyecto utiliza Firebase Firestore para almacenar datos. Las reglas de seguridad están en el archivo `firestore.rules`.

## Colecciones Utilizadas

1. **products** - Productos de la tienda
2. **users** - Usuarios registrados
3. **appointments** - Citas de Personal Shopper
4. **availability** - Configuración de disponibilidad para citas
5. **shipments** - Envíos y tracking

## Cómo Aplicar las Reglas

### Opción 1: Usando Firebase Console (Recomendado)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **ginger-6dba3**
3. Ve a **Firestore Database** en el menú lateral
4. Haz clic en la pestaña **Rules** (Reglas)
5. Copia el contenido del archivo `firestore.rules`
6. Pega el contenido en el editor de reglas
7. Haz clic en **Publish** (Publicar)

### Opción 2: Usando Firebase CLI

Si tienes Firebase CLI instalado:

```bash
# Iniciar sesión en Firebase
firebase login

# Inicializar Firebase (si no lo has hecho)
firebase init firestore

# Desplegar las reglas
firebase deploy --only firestore:rules
```

## Reglas de Desarrollo vs Producción

Las reglas actuales permiten lectura y escritura a todos los usuarios (`allow read, write: if true`). Esto es para facilitar el desarrollo.

### Para Producción, considera:

1. **Autenticación requerida para escrituras:**
   ```javascript
   allow write: if request.auth != null;
   ```

2. **Solo lectura pública, escritura solo para admin:**
   ```javascript
   allow read: if true;
   allow write: if request.auth != null && request.auth.token.admin == true;
   ```

3. **Propiedad de datos:**
   ```javascript
   allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
   ```

## Nota de Seguridad

⚠️ **IMPORTANTE**: Las reglas actuales permiten acceso completo para facilitar el desarrollo. 
En producción, deberías implementar autenticación y restricciones más estrictas.

## Verificar las Reglas

Después de aplicar las reglas, puedes verificar que funcionan:

1. Intenta crear una cita desde la página de Personal Shopper
2. Intenta crear un producto desde el admin
3. Revisa la consola del navegador para ver si hay errores de permisos

Si sigues viendo errores de permisos:
- Verifica que las reglas se publicaron correctamente
- Espera unos minutos (puede haber un pequeño retraso)
- Verifica que estás usando el proyecto correcto de Firebase


