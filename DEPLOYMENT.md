# Instrucciones de Despliegue a Vercel

## Cambios Realizados

Se han corregido 3 problemas críticos en `index.html`:

### 1. VISUALIZACIÓN: Ahora muestra nombres en lugar de IDs
- Los chips de cliente ahora muestran nombres reales
- Se enriquecen los datos usando el campo `clientName` de los costos
- Fallback a lookup en la tabla de clientes si es necesario

### 2. CARGA DE DATOS: Completamente implementada
- Renderiza años dinámicamente
- Renderiza ferias dinámicamente (filtradas por año)
- Renderiza clientes dinámicamente (filtrados por año + feria)
- Todos los filtros funcionan correctamente

### 3. PRESUPUESTOS: Sin cambios necesarios
- Ya funcionaba correctamente

## Para Desplegar a Vercel

### Opción 1: Desde la terminal (recomendado)
```bash
cd /Users/maccuatro/PROGRAMACION/CLAUDE/DEMOSTRA
npm run deploy
```

### Opción 2: Usar interfaz de Vercel
1. Ir a https://vercel.com/
2. Seleccionar el proyecto "demostra-ferias"
3. Ver que detecta automáticamente los cambios
4. Click en "Deploy"

### Opción 3: Desde GitHub (si está sincronizado)
- Los cambios en el repositorio se desplegarán automáticamente

## Verificación Post-Deploy

Después de desplegar, verificar que:

1. **VISUALIZACIÓN** (tab "Visualización")
   - Seleccionar un año → Verificar que aparecen ferias
   - Seleccionar una feria → Verificar que aparecen nombres de clientes (NO IDs)
   - Ejemplos correctos: "Cliente A", "Cliente B"
   - Ejemplos incorrectos: "2c3d5f7g-9h1j-4k5l-8m9n-0p1q2r3s4t5u"

2. **CARGA DE DATOS** (tab "Carga de Datos")
   - Verificar que aparecen años
   - Seleccionar año → Verificar que aparecen ferias
   - Seleccionar feria → Verificar que aparecen nombres de clientes (NO IDs)

3. **PRESUPUESTOS** (tab "Presupuestos")
   - Verificar que funciona sin errores
   - Seleccionar año → ferias → clientes

## Archivos Modificados

- `/Users/maccuatro/PROGRAMACION/CLAUDE/DEMOSTRA/index.html`
  - Línea 902: Agregado `allClients[]`
  - Línea 996-999: Agregado `getClientName()` helper
  - Línea 1001-1010: Actualizado `init()` para cargar clientes
  - Línea 1044-1064: Corregido `initViz()` para mostrar nombres
  - Línea 1114-1164: Completado `buildCargaFilters()` con lógica completa

## Resumen de Cambios

- **+** 1 variable global (allClients)
- **+** 1 función helper (getClientName)
- **~** 1 función actualizada (init)
- **~** 2 funciones corregidas/implementadas (initViz, buildCargaFilters)
- **✓** 100% backward compatible
- **✓** Sin cambios en HTML
- **✓** Sin cambios en CSS
- **✓** Sin cambios en Firebase

## Notas Importantes

- Los datos en Firestore ya tienen el campo `clientName` guardado en los costos
- Esto fue verificado en `restart.html` línea 140
- El código ahora aprovecha ese campo para mostrar nombres sin necesidad de hacer múltiples queries

## Rollback (si es necesario)

Si hay algún problema después del despliegue:
1. Revertir el despliegue a la versión anterior desde Vercel dashboard
2. Contactar para revisar el problema específico
