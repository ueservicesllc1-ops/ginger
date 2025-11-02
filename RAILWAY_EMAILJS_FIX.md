# 🔧 Solución para Error de EmailJS en Railway

## Problema
El error "EmailJS no está configurado" aparece en Railway aunque las variables estén configuradas.

## Causa
En Next.js, las variables `NEXT_PUBLIC_*` se inyectan en **tiempo de BUILD**, no en runtime. Si agregas las variables después del build o sin reiniciar, no estarán disponibles.

## Solución Paso a Paso

### 1. Verificar Variables en Railway
Ve a tu proyecto en Railway → **Variables** y asegúrate de tener:

```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=qiQ8ePjd70mK3bNGD
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_1y0786u
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
```

**⚠️ IMPORTANTE:**
- No dejes espacios antes o después del `=`
- Verifica que el Template ID sea correcto
- Copia exactamente los valores sin comillas

### 2. Reiniciar el Deployment
Después de agregar/modificar las variables:

1. Ve a tu servicio en Railway
2. Haz clic en el menú (3 puntos) → **Redeploy** o **Restart**
3. Espera a que el deployment termine completamente

### 3. Verificar el Build Log
Revisa los logs del build en Railway para confirmar que no hay errores. Las variables `NEXT_PUBLIC_*` deben estar disponibles durante el build.

### 4. Si Aún No Funciona

#### Opción A: Forzar Rebuild Completo
1. En Railway, ve a **Settings**
2. Busca la opción de "Clear build cache" o similar
3. Haz un nuevo deployment

#### Opción B: Verificar Variables Manualmente
En Railway, agrega temporalmente esto en el build command para verificar:

```bash
echo "EMAILJS vars: $NEXT_PUBLIC_EMAILJS_SERVICE_ID"
```

### 5. Verificación Final
Una vez que el deployment esté completo:

1. Abre la consola del navegador en tu app en Railway
2. Intenta crear una cita
3. Deberías ver en la consola si las variables están disponibles

## Checklist

- [ ] Variables agregadas en Railway (sin espacios extra)
- [ ] Deployment reiniciado después de agregar variables
- [ ] Build completado sin errores
- [ ] Template ID es correcto en EmailJS
- [ ] Verificado que las variables no tienen comillas

## Nota Técnica
Next.js reemplaza `process.env.NEXT_PUBLIC_*` en tiempo de build con los valores reales. Esto significa que las variables deben estar disponibles **antes** del build, no durante el runtime.

