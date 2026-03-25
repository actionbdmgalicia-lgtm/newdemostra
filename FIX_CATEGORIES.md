# FIX: Visualización de Categorías en Gastos

## PROBLEMA IDENTIFICADO
Las categorías (CARPINTERIA, GRAFICA, MONTAJE, ELECTRICIDAD, etc.) no se mostraban en la visualización de GASTOS porque:

1. Los datos importados desde Firestore solo tenían el campo `tipo`, no `type2`
2. Las funciones de visualización esperaban `type2` para agrupar por categoría
3. Faltaban algunas opciones de categoría en el formulario de carga

## SOLUCIONES IMPLEMENTADAS

### 1. Función de Enriquecimiento de Datos
**Archivo:** `/Users/maccuatro/PROGRAMACION/CLAUDE/DEMOSTRA/index.html`

Agregada función `enrichCostsWithType2()` que:
- Se ejecuta después de cargar datos de Firestore en `init()`
- Se ejecuta después de guardar un nuevo costo
- Copia el valor de `tipo` a `type2` si este último no existe
- Asegura que todos los costos tengan `type2` (default: 'OTROS')

**Ubicación en código:**
- Línea 1043-1052: Definición de función
- Línea 1038: Llamada en `init()`
- Línea 1661: Llamada después de guardar costo

### 2. Actualización de Opciones de Categoría
**Archivo:** `/Users/maccuatro/PROGRAMACION/CLAUDE/DEMOSTRA/index.html`
**Líneas:** 1554-1567

Se agregaron categorías faltantes:
- ✅ CARPINTERIA (existía)
- ✅ MONTAJE (existía)
- ✅ MATERIAL (existía)
- ✅ TRANSPORTE (existía)
- ✅ GASTOS VIAJE (existía)
- ✅ **GRAFICA** (NUEVO)
- ✅ **MOB ALQ** (NUEVO)
- ✅ **ELECTRICIDAD** (NUEVO)
- ✅ **SERVICIOS FERIALES** (NUEVO - presente en datos importados)
- ✅ OTROS (existía)

### 3. Funciones Ya Correctas
Las siguientes funciones ya funcionaban correctamente y no requerían cambios:

- **`makeGroup()`** (línea 1209): Agrupa correctamente por `type2`
- **`makeTipo()`** (línea 1249): Muestra detalles de cada categoría
- **`renderDetail()`** (línea 1158): Llama a `makeGroup()` correctamente
- **`applyFilters()`** (línea 1125): Llama a `renderDetail()` después de filtrar
- **`renderCargaDetail()`** (línea 1670): También usa `makeGroup()` para visualización en pestaña de carga

## RESULTADO ESPERADO
✅ GASTOS ahora mostrará categorías expandibles:
- CARPINTERIA
- MONTAJE
- MATERIAL
- TRANSPORTE
- GASTOS VIAJE
- GRAFICA
- MOB ALQ
- ELECTRICIDAD
- SERVICIOS FERIALES
- OTROS

✅ Cada categoría expandible mostrará tabla con:
- Cliente
- Descripción
- Proveedor
- Importe
- Estado

✅ Gráfico mostrará breakdown por categoría

## TESTING RECOMENDADO
1. Navegar a pestaña VISUALIZACIÓN
2. Seleccionar año, feria y cliente
3. Verificar que GASTOS muestra categorías expandibles
4. Hacer clic en cada categoría para ver detalles
5. Cargar nuevo costo en pestaña CARGA y verificar categoría se asigna correctamente
6. Verificar que datos importados (con `tipo` pero sin `type2`) se muestran correctamente

## ARCHIVOS MODIFICADOS
- `/Users/maccuatro/PROGRAMACION/CLAUDE/DEMOSTRA/index.html`
  - Función `enrichCostsWithType2()` agregada (línea 1043)
  - Llamadas a enriquecimiento agregadas (línea 1038, 1661)
  - Opciones de categoría expandidas (línea 1554-1567)
