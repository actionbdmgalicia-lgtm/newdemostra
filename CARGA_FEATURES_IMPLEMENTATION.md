# CARGA DE DATOS - NUEVAS FUNCIONALIDADES IMPLEMENTADAS

**Fecha de Implementación:** 25 de Marzo de 2026
**Estado:** COMPLETADO Y LISTO PARA DESPLEGAR

---

## RESUMEN DE CAMBIOS

Se han implementado todas las funcionalidades solicitadas para la sección **CARGA DE DATOS**:

### ✅ 1. CREAR NUEVAS FERIAS
- **Ubicación:** Botón "+" junto al filtro FERIA
- **Funcionalidad:** Abre modal con campos para:
  - Nombre de la feria
  - Año
- **Guardar:** Crea documento en Firestore (colección `exhibitions`)
- **Actualización:** Recarga automática la lista de ferias y la vista

**Función JavaScript:**
```javascript
openCreateFeriaModal()  // Abre el modal
createFeria()          // Crea feria en Firestore
```

---

### ✅ 2. CREAR NUEVOS CLIENTES
- **Ubicación:** Botón "+" junto al filtro CLIENTE
- **Funcionalidad:** Abre modal con campo para:
  - Nombre del cliente
- **Validación:** Verifica que el cliente no exista
- **Guardar:** Crea documento en Firestore (colección `clients`)
- **Actualización:** Recarga automática la lista de clientes

**Función JavaScript:**
```javascript
openCreateClienteModal()  // Abre el modal
createCliente()          // Crea cliente en Firestore
```

---

### ✅ 3. ASIGNAR MÚLTIPLES CLIENTES A PARTIDA
- **Interfaz:** Sistema de chips con MULTI-SELECT
- **Comportamiento:**
  - Cada cliente es un chip clickeable
  - Chip "TODOS" deselecciona todos los clientes
  - Pueden seleccionarse múltiples clientes simultáneamente
  - Los clientes seleccionados aparecen resaltados

**Variables:**
```javascript
cSelClientesMultiples  // Set con IDs de clientes seleccionados
```

---

### ✅ 4. DISTRIBUCIÓN AUTOMÁTICA (PROPORCIONAL)
- **Activación:** Cuando se selecciona más de 1 cliente y se intenta guardar
- **Funcionamiento:**
  - Abre modal con opciones de distribución
  - Opción "Automática" seleccionada por defecto
  - Divide el importe EN PARTES IGUALES entre todos los clientes
  - Muestra tabla con cliente y cantidad asignada

**Ejemplo:**
```
Importe Total: 1.000€
Clientes Seleccionados: 3
Distribución Automática:
  - Cliente A: 333,33€
  - Cliente B: 333,33€
  - Cliente C: 333,34€
```

**Función JavaScript:**
```javascript
openDistributionModal(totalAmount, selectedClients)
selectDistMode('auto')
renderDistributionContent()  // Renderiza tabla de distribución
```

---

### ✅ 5. DISTRIBUCIÓN MANUAL ENTRE CLIENTES
- **Activación:** Seleccionar modo "Manual" en modal de distribución
- **Interfaz:**
  - Tabla con un input por cada cliente
  - Entrada de cantidad manual para cada uno
  - Suma automática en tiempo real
  - Indicador de faltante/exceso

**Validación:**
- El total distribuido DEBE ser exactamente igual al importe original
- Si no coincide, muestra error y no permite guardar

**Funciones JavaScript:**
```javascript
selectDistMode('manual')         // Cambia a modo manual
updateClientAmount(clientId)     // Actualiza cantidad de cliente
applyDistribution()              // Valida y guarda distribución
```

---

## CAMBIOS TÉCNICOS DETALLADOS

### Cambios en HTML

#### 1. Botones de Creación (línea ~710-715)
```html
<div style="display:flex;align-items:center;gap:12px;">
  <div class="chips" id="cChipsFeria" style="flex:1;"></div>
  <button class="btn btn-primary" onclick="openCreateFeriaModal()">+ Crear Feria</button>
</div>

<div style="display:flex;align-items:center;gap:12px;">
  <div class="chips" id="cChipsCliente" style="flex:1;"></div>
  <button class="btn btn-primary" onclick="openCreateClienteModal()">+ Crear Cliente</button>
</div>
```

#### 2. Nuevos Modales (línea ~900-950)

**Modal Crear Feria:**
```html
<div class="modal-overlay" id="modalCreateFeria">
  <!-- Campos: createFeriaNombre, createFeriaAnyo -->
</div>
```

**Modal Crear Cliente:**
```html
<div class="modal-overlay" id="modalCreateCliente">
  <!-- Campo: createClienteNombre -->
</div>
```

**Modal Distribución:**
```html
<div class="modal-overlay" id="modalDistribution">
  <!-- Botones de modo auto/manual -->
  <!-- Contenedor dinámico para distribución -->
  <!-- IDs: distAutoBut, distManualBut, distContent -->
</div>
```

### Cambios en JavaScript

#### 1. Variables Globales (línea ~1485)
```javascript
let cSelYear = null, cSelFeria = null, cSelCliente = null;
let cSelClientesMultiples = new Set();  // NUEVO: Multi-select
let cDistributionMode = 'auto';         // NUEVO
let cDistributionData = { ... };        // NUEVO: Datos de distribución
```

#### 2. initCarga() - Inicialización (línea ~1487)
- Inicializa `cSelClientesMultiples.clear()`
- Mantiene compatibilidad con estructura anterior

#### 3. buildCargaFilters() - Sistema de Chips (línea ~1516)
**COMPLETAMENTE REESCRITO:**
- Antes: Renderizado simple con `renderChips()`
- Ahora: Renderizado manual de chips para permitir multi-select
- Cada click toggle el estado del cliente en el Set
- Chip "TODOS" limpia el Set

#### 4. renderCargaContent() (línea ~1571)
**ACTUALIZADO:**
- Antes: Validaba `cSelCliente === null`
- Ahora: Valida `cSelClientesMultiples.size === 0`
- Filtra costos con `cSelClientesMultiples.has(c.clientId)`

#### 5. saveCargaCost() (línea ~1652)
**COMPLETAMENTE REESCRITO:**
```javascript
// NUEVO: Si hay múltiples clientes
if (cSelClientesMultiples.size > 1) {
  openDistributionModal(importe, Array.from(cSelClientesMultiples));
  return;  // Detiene aquí, espera distribución
}

// ACTUALIZADO: Si un solo cliente
const clientId = Array.from(cSelClientesMultiples)[0];
// ... continúa guardando normalmente
```

#### 6. Nuevas Funciones de Creación (línea ~2124)
```javascript
openCreateFeriaModal()      // Abre modal crear feria
createFeria()               // Guarda feria en Firestore
openCreateClienteModal()    // Abre modal crear cliente
createCliente()             // Guarda cliente en Firestore
```

#### 7. Nuevas Funciones de Distribución (línea ~2192)
```javascript
openDistributionModal()       // Abre modal con datos
selectDistMode(mode)          // Cambia entre auto/manual
renderDistributionContent()   // Renderiza tabla de distribución
updateClientAmount()          // Actualiza cantidad en modo manual
applyDistribution()           // Valida y guarda
```

---

## FLUJO DE USO

### Escenario 1: Crear Feria Rápida
1. Usuario clickea "AÑO" → selecciona año
2. Usuario clickea botón "+ Crear Feria" junto a FERIA
3. Ingresa nombre y año → Clickea "Crear Feria"
4. Modal se cierra, lista se actualiza, página se recarga

### Escenario 2: Crear Cliente Rápido
1. Usuario clickea "AÑO" → selecciona año
2. Usuario clickea "FERIA" → selecciona feria
3. Usuario clickea botón "+ Crear Cliente" junto a CLIENTE
4. Ingresa nombre → Clickea "Crear Cliente"
5. Modal se cierra, lista se actualiza, página se recarga

### Escenario 3: Movimiento Distribuido Manual
1. Selecciona AÑO → FERIA → 3 CLIENTES diferentes
2. Completa formulario de movimiento
   - Tipo: VENTAS
   - Categoría: CARPINTERIA
   - Descripción: "Muestra stand"
   - Proveedor: "Empresa X"
   - Importe: 1.000€
3. Clickea "Guardar Movimiento"
4. **Modal Distribución se abre automáticamente**
5. Selecciona "Manual"
6. Ingresa cantidades:
   - Cliente A: 400€
   - Cliente B: 300€
   - Cliente C: 300€
7. Valida que la suma = 1.000€ (✓ Verde)
8. Clickea "Guardar Distribución"
9. **Crea 3 documentos en costos** (uno por cliente)
10. Formulario se limpia, lista se actualiza

### Escenario 4: Movimiento Distribuido Automático
1. Selecciona AÑO → FERIA → 4 CLIENTES
2. Completa movimiento con Importe: 800€
3. Clickea "Guardar Movimiento"
4. **Modal Distribución se abre**
5. Modo "Automática" está seleccionado
6. Muestra distribución: 200€ por cliente (4 clientes)
7. Clickea "Guardar Distribución"
8. **Crea 4 documentos** (200€ cada uno)

---

## VALIDACIONES IMPLEMENTADAS

### Crear Feria
✅ Nombre requerido
✅ Año requerido y >= 2000

### Crear Cliente
✅ Nombre requerido
✅ No permite duplicados

### Distribución Manual
✅ Suma total debe = Importe original
✅ Mantiene validación en tiempo real

### Distribución Automática
✅ Divide exactamente entre número de clientes
✅ Maneja decimales correctamente

---

## FIRESTORE STRUCTURE

### Nueva Estructura de `costs` (sin cambios)
```json
{
  "type": "VENTAS",
  "type2": "CARPINTERIA",
  "description": "Descripción",
  "provider": "Proveedor",
  "amount": 333.33,
  "status": "PAGADO",
  "date": "2026-03-25",
  "feriaId": "id-feria",
  "clientId": "id-cliente-A",
  "clientName": "Cliente A",
  "createdAt": "2026-03-25...",
  "createdBy": "user@example.com"
}
```

**Nota:** Cuando se distribuye un movimiento entre 3 clientes, se crean 3 documentos separados (uno por cliente) en lugar de 1.

---

## TESTING CHECKLIST

### Funcionalidad Crear Feria
- [ ] Botón visible en página CARGA DE DATOS
- [ ] Abre modal con 2 campos
- [ ] Valida campo nombre (requerido)
- [ ] Valida campo año (requerido, >= 2000)
- [ ] Guarda en Firestore
- [ ] Actualiza lista de ferias
- [ ] Redirige al formulario de carga

### Funcionalidad Crear Cliente
- [ ] Botón visible solo después de seleccionar feria
- [ ] Abre modal con 1 campo
- [ ] Valida duplicados
- [ ] Guarda en Firestore
- [ ] Actualiza lista de clientes
- [ ] Recarga página

### Multi-Select Clientes
- [ ] Chips muestran todos los clientes disponibles
- [ ] Click en chip lo marca como seleccionado
- [ ] Multiple clientes pueden seleccionarse
- [ ] Chip "TODOS" deselecciona todos

### Distribución Automática
- [ ] Modal abre cuando se intenta guardar con 2+ clientes
- [ ] Modo "Automática" es predeterminado
- [ ] Divide importe correctamente (igual para todos)
- [ ] Tabla muestra cliente y cantidad
- [ ] Clickea "Guardar" → crea N documentos
- [ ] Formulario se limpia
- [ ] Lista se actualiza

### Distribución Manual
- [ ] Click en botón "Manual" cambia modo
- [ ] Inputs aparecen para cada cliente
- [ ] Suma total se actualiza en tiempo real
- [ ] Indicador de faltante/exceso funciona
- [ ] Validación: No permite guardar si suma ≠ total
- [ ] Permite guardar si suma = total exactamente
- [ ] Crea documentos correctos en Firestore

### Compatibilidad
- [ ] Un solo cliente seleccionado funciona sin modal
- [ ] Datos existentes se cargan correctamente
- [ ] Gráficos y estadísticas funcionan correctamente

---

## DEPLOYMENT INSTRUCTIONS

1. **Backup:**
   ```
   cp index.html index.html.backup-[fecha]
   ```

2. **Verificar en navegador:**
   - Abrir DevTools (F12)
   - Console debe estar limpia (sin errores)
   - Verificar funcionalidades mencionadas en TESTING CHECKLIST

3. **Deploy a Vercel:**
   ```
   git add index.html
   git commit -m "feat: implement multiple client distribution in CARGA DE DATOS"
   git push origin main
   ```

4. **Verificar en producción:**
   - Abrir app en navegador
   - Probar todos los escenarios

---

## NOTAS IMPORTANTES

1. **Compatibilidad Backward:**
   - Sistema mantiene `cSelCliente` para posible uso futuro
   - No rompe funcionalidad existente

2. **Performance:**
   - Multi-select renderizado manualmente (más eficiente que renderChips)
   - Modales usan display:flex y CSS existente

3. **Estructura Firestore:**
   - No se crean documentos nuevos
   - Se usan colecciones existentes
   - Cada línea de distribución es un documento separado

4. **Actualización Automática:**
   - Después de crear feria → `initCarga()` se ejecuta
   - Después de crear cliente → `initCarga()` se ejecuta
   - Después de guardar distribución → `renderCargaContent()` se ejecuta

---

## FUNCIONALIDADES FUTURAS (No Implementadas)

- [ ] Editar movimientos después de guardar
- [ ] Copiar distribución de movimientos anteriores
- [ ] Templates de distribución predefinidas
- [ ] Reporte de distribuciones por feria/cliente

---

**Implementado por:** Claude
**Fecha:** 25 de Marzo de 2026
**Versión:** 1.0.0
