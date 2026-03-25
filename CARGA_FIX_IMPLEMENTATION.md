# Implementación: Asignación de Clientes a Ferias en CARGA

## Problema Original
En CARGA DE DATOS, al filtrar por feria, solo mostraba clientes que ya existían en esa feria. Los usuarios no podían:
- Asignar clientes de otras ferias a una feria nueva
- Crear un cliente nuevo y automáticamente asignarlo a la feria
- Ver claramente qué clientes estaban asignados vs. no asignados

## Solución Implementada

### 1. Estructura de Base de Datos
Se creó una nueva colección `clientFeriaAssignments` que almacena:
```javascript
{
  clientId: string,
  feriaIds: [feriaId1, feriaId2, ...],
  createdAt: timestamp,
  createdBy: email,
  updatedAt: timestamp
}
```

### 2. Variables Globales Agregadas
```javascript
let clientFeriaAssignments = new Map(); // clientId -> Set de feriaIds
```

### 3. Funciones Implementadas

#### `assignClientToFeria(clientId, feriaId)` (NUEVA)
- **Ubicación**: Línea ~1643
- **Función**: Asigna un cliente a una feria en Firestore
- **Lógica**:
  1. Busca si ya existe una asignación para ese cliente
  2. Agrega la feriaId al conjunto existente
  3. Actualiza o crea el documento en Firestore

#### `init()` (MODIFICADA)
- **Cambio**: Ahora carga automáticamente las asignaciones cliente-feria al iniciar
- **Líneas**: ~1094-1110
- **Efecto**: Llena el mapa `clientFeriaAssignments` con todos los datos

#### `buildCargaFilters()` (MODIFICADA)
- **Cambio**: Separación visual de clientes asignados vs. no asignados
- **Líneas**: ~1518-1641
- **Nuevas Secciones**:
  - 📌 **Asignados a esta feria**: Clientes que ya están asignados
  - **+ De otras ferias (click asigna)**: Clientes disponibles de otras ferias con asignación automática al click
  - **+ NUEVO CLIENTE**: Botón para crear cliente nuevo

#### `createCliente()` (MODIFICADA)
- **Cambio**: Auto-asigna nuevo cliente a la feria seleccionada
- **Líneas**: ~2285-2331
- **Efecto**: Si el usuario está en CARGA con una feria seleccionada, el cliente nuevo se asigna automáticamente

#### `saveCargaCost()` (MODIFICADA)
- **Cambio**: Asigna automáticamente si el cliente no está asignado
- **Líneas**: ~1820-1833
- **Efecto**: Al guardar un gasto, si el cliente no estaba asignado a la feria, se asigna automáticamente

#### `applyDistribution()` (MODIFICADA)
- **Cambio**: Asigna clientes en distribución múltiple
- **Líneas**: ~2479-2497
- **Efecto**: Cuando se distribuye gastos entre múltiples clientes, todos quedan asignados a la feria

### 4. Flujo de Usuario Mejorado

```
1. Selecciona Año → Muestra ferias del año
2. Selecciona Feria → Muestra 3 secciones:

   📌 ASIGNADOS A ESTA FERIA
   [Cliente A] [Cliente B] [Cliente C]

   + DE OTRAS FERIAS (CLICK ASIGNA)
   [Cliente D →] [Cliente E →]

   + NUEVO CLIENTE

3. Click en cliente no asignado → Se asigna automáticamente
4. Click en "+ NUEVO CLIENTE" → Se crea y se asigna automáticamente
5. Al guardar gasto → Si cliente no está asignado, se asigna automáticamente
```

## Cambios en Firestore

### Nueva Colección: `clientFeriaAssignments`
```javascript
// Antes: No existía
// Después: Tabla de relaciones cliente-feria
{
  clientId: "client_123",
  feriaIds: ["feria_1", "feria_2"],
  createdAt: 2026-03-25,
  createdBy: "user@example.com",
  updatedAt: 2026-03-25
}
```

## Validación Manual

### Test 1: Crear cliente nuevo en feria
1. Ir a CARGA
2. Seleccionar Año y Feria
3. Click "+ NUEVO CLIENTE"
4. Ingresar nombre
5. ✓ Debe aparecer en "ASIGNADOS A ESTA FERIA"

### Test 2: Asignar cliente de otra feria
1. Ir a CARGA
2. Seleccionar Año y Feria
3. Click en cliente en "DE OTRAS FERIAS"
4. ✓ Cliente debe pasar a "ASIGNADOS"
5. ✓ Debe quedar seleccionado automáticamente

### Test 3: Auto-asignación al guardar
1. Ir a CARGA
2. Seleccionar Año, Feria, y cliente (cualquiera)
3. Llenar formulario de gasto
4. Guardar
5. Cambiar a otra feria y volver
6. ✓ Cliente debe aparecer en "ASIGNADOS"

### Test 4: Distribución múltiple
1. Ir a CARGA
2. Seleccionar Año, Feria, y 2+ clientes
3. Llenar formulario y guardar
4. Modal de distribución aparece
5. Confirmar distribución
6. ✓ Todos los clientes deben quedar asignados

## Notas de Desarrollo

- **Sin Downtime**: El código es retrocompatible. Funciona con clientes antiguos sin asignaciones
- **Performance**: Las asignaciones se cargan una sola vez en `init()`
- **Error Handling**: Si falla la asignación en Firestore, se muestra alerta pero continúa
- **Caché Local**: Se mantiene `clientFeriaAssignments` en memoria para velocidad

## Despliegue

1. Verificar que no hay errores de sintaxis en `index.html`
2. Hacer commit de cambios
3. Hacer push a `main` branch
4. Vercel auto-despliega
5. Verificar que funciona en staging antes de producción

## Rollback

Si hay problemas:
1. Revertir a versión anterior de `index.html`
2. La colección `clientFeriaAssignments` permanecerá en Firestore pero no se usará
3. El sistema funcionará como antes

## Archivos Modificados

- `/Users/maccuatro/PROGRAMACION/CLAUDE/DEMOSTRA/index.html`

## Líneas de Código Añadidas

- 1 variable global nueva
- 1 función completamente nueva (`assignClientToFeria`)
- ~200 líneas en `buildCargaFilters()` reescrita
- ~30 líneas en `createCliente()` agregadas
- ~10 líneas en `saveCargaCost()` agregadas
- ~15 líneas en `applyDistribution()` agregadas
- ~15 líneas en `init()` agregadas

**Total**: ~280 líneas nuevas/modificadas

## Dependencias

- Firebase Firestore (ya existe)
- Ninguna librería externa nueva requerida
