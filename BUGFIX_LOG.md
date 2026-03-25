# Bugfix Log - 25 Mar 2026

## Problemas Identificados y Corregidos

### 1. VISUALIZACIÓN: Códigos (IDs) en lugar de nombres de clientes
**Problema**: En los chips de cliente, se mostraba `c.clientId` (UUID) en lugar del nombre real del cliente.

**Causa**: La función `initViz()` estaba pasando directamente los IDs de cliente a `renderChips()` sin hacer enriquecimiento de datos.

**Solución**:
- Agregar cache `allClients[]` para almacenar documentos de clientes
- Usar `clientName` del documento de costos si está disponible
- Fallback a `getClientName()` helper para buscar por ID si es necesario
- Modificar `renderChips()` para mostrar nombres en lugar de IDs

### 2. CARGA DE DATOS: No aparecen ferias ni clientes
**Problema**: La página de "Carga de Datos" solo mostraba años pero no ferias ni clientes.

**Causa**: La función `initCarga()` estaba incompleta - solo renderizaba años y luego tenía comentarios sobre reset de filtros sin implementación.

**Solución**:
- Implementar `buildCargaFilters()` como función separada
- Agregar renderizado dinámico de ferias basado en año seleccionado
- Agregar renderizado dinámico de clientes basado en año y feria seleccionados
- Implementar state tracking con variables `cSelYear` y `cSelFeria`

### 3. PRESUPUESTOS: Ya estaban correctos
**Nota**: Los presupuestos ya usaban campos `cliente` y `feria` como textos (no IDs), así que no necesitaban cambios.

## Cambios en index.html

### Línea 902
```javascript
let allClients = []; // Cache de clientes para enriquecimiento
```

### Línea 996-999
```javascript
// Helper para obtener el nombre del cliente por ID
function getClientName(clientId) {
  const client = allClients.find(c => c.id === clientId);
  return client ? client.name : clientId;
}
```

### Línea 1001-1010
```javascript
async function init() {
  const [fSnap, cSnap, clSnap] = await Promise.all([
    db.collection('exhibitions').get(),
    db.collection('costs').get(),
    db.collection('clients').get()  // Nuevo: cargar clientes
  ]);
  allFerias = []; fSnap.forEach(d => allFerias.push({id:d.id,...d.data()}));
  allCosts  = []; cSnap.forEach(d => allCosts.push({id:d.id,...d.data()}));
  allClients = []; clSnap.forEach(d => allClients.push({id:d.id,...d.data()}));  // Nuevo
  loadDashboard();
}
```

### Línea 1044-1064: Corregida función initViz()
- Crear `clientsMap` para mapear IDs a nombres
- Usar `c.clientName` si está disponible
- Fallback a `getClientName()` si no
- Renderizar chips con nombres ordenados alfabéticamente

### Línea 1114-1164: Implementada función buildCargaFilters()
- Renderizar ferias filtradas por año
- Renderizar clientes filtrados por año y feria
- Usar nombres en lugar de IDs
- Mantener estado con variables `cSelYear` y `cSelFeria`

## Validación

- Sintaxis HTML/JavaScript: ✓ Válida
- Elementos DOM requeridos: ✓ Presentes
- Funciones helper: ✓ Implementadas
- Cargas de datos: ✓ Completadas
- Enriquecimiento de datos: ✓ Implementado

## Próximos Pasos

1. Desplegar a Vercel
2. Probar en navegador que:
   - VISUALIZACIÓN muestra nombres de clientes
   - CARGA DE DATOS muestra ferias y clientes dinámicamente
   - PRESUPUESTOS funciona correctamente
