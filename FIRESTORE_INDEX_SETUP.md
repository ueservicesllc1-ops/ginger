# Configuración de Índices de Firestore

## Error: Índice Compuesto Requerido

Firestore requiere un índice compuesto cuando se ordena por múltiples campos. El error proporciona un enlace directo para crear el índice.

## Solución Rápida

**Haz clic en este enlace (Firebase lo genera automáticamente):**

```
https://console.firebase.google.com/v1/r/project/ginger-6dba3/firestore/indexes?create_composite=ClFwcm9qZWN0cy9naW5nZXItNmRiYTMvZGF0YWJhc2VzLyhkZWZFdWx0KS9jb2xsZWN0aW9uR3JvdXBzL2FwcG9pbnRtZW50cy9pbmRleGVzL18QARoICgRkYXRlEAEaCAoEdGltZRABGgwKCF9fbmFtZV9fEAE
```

O sigue estos pasos:

1. **Ve a Firebase Console:**
   - https://console.firebase.google.com/
   - Selecciona el proyecto: **ginger-6dba3**

2. **Navega a Firestore Database:**
   - En el menú lateral, haz clic en "Firestore Database"
   - Haz clic en la pestaña "Indexes" (Índices)

3. **Crea el índice:**
   - Firebase debería mostrar un botón o mensaje para crear el índice automáticamente
   - Si no, haz clic en "Create Index" (Crear Índice)

4. **Configuración del índice:**
   - **Collection ID:** `appointments`
   - **Fields to index:**
     - `date` (Ascending)
     - `time` (Ascending)
   - Haz clic en "Create" (Crear)

5. **Espera la creación:**
   - Los índices pueden tardar unos minutos en crearse
   - Verás el estado "Building" mientras se crea
   - Una vez completado, el estado cambiará a "Enabled"

## Alternativa: Simplificar la Consulta

Si prefieres no crear el índice, puedes modificar la consulta para ordenar solo por `date`. Esto funcionará sin índice compuesto.

## Verificación

Después de crear el índice:
1. Espera a que el estado sea "Enabled"
2. Recarga la aplicación
3. El error debería desaparecer


