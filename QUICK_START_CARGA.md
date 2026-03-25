# QUICK START - NUEVAS FUNCIONALIDADES CARGA DE DATOS

## 🎯 RESUMEN RÁPIDO

Se han añadido **5 nuevas funcionalidades** a la sección de CARGA DE DATOS:

| # | Funcionalidad | Ubicación | Resultado |
|---|---|---|---|
| 1 | **Crear Feria** | Botón "+" junto a FERIA | Abre modal para crear feria |
| 2 | **Crear Cliente** | Botón "+" junto a CLIENTE | Abre modal para crear cliente |
| 3 | **Multi-Select Clientes** | Chips de clientes | Ahora permite seleccionar múltiples |
| 4 | **Distribución Automática** | Modal de distribución | Divide cantidad en partes iguales |
| 5 | **Distribución Manual** | Modal de distribución | Ingresa cantidad para cada cliente |

---

## 📋 CÓMO USAR

### 1️⃣ CREAR UNA FERIA

```
Carga de Datos → Selecciona AÑO → Clickea "+ Crear Feria"
```

**Modal:**
- Nombre: "Madrid XL 2026"
- Año: "2026"
- Botón: "Crear Feria"

✅ **Resultado:** Feria disponible en filtro FERIA

---

### 2️⃣ CREAR UN CLIENTE

```
Carga de Datos → Año → Feria → Clickea "+ Crear Cliente"
```

**Modal:**
- Nombre: "Empresa ABC"
- Botón: "Crear Cliente"

✅ **Resultado:** Cliente disponible como chip seleccionable

---

### 3️⃣ SELECCIONAR MÚLTIPLES CLIENTES

En la sección CLIENTE, simplemente **haz click en cada cliente** que quieras incluir.

```
CLIENTE:  [TODOS]  [Empresa A]  [Empresa B]  [Empresa C]
                        ✓              ✓         (seleccionados)
```

✅ **Resultado:** Los chips seleccionados aparecen con fondo dorado

---

### 4️⃣ DISTRIBUIR CANTIDAD AUTOMÁTICA

```
1. Selecciona 2+ clientes
2. Completa el formulario de movimiento
3. Ingresa el IMPORTE total
4. Clickea "Guardar Movimiento"
```

**Modal aparece automáticamente:**

```
Distribución Automática (seleccionado por defecto)
Importe: 1.000€
Clientes: 4

Resultado:
├─ Cliente A: 250€
├─ Cliente B: 250€
├─ Cliente C: 250€
└─ Cliente D: 250€

[Cancelar] [Guardar Distribución]
```

✅ **Resultado:** Crea 4 documentos (uno por cliente con 250€ cada uno)

---

### 5️⃣ DISTRIBUIR CANTIDAD MANUAL

```
En el modal de distribución, clickea botón "Manual"
```

**Modal cambia a modo manual:**

```
┌─────────────────────┬──────────┐
│ Cliente             │ Cantidad │
├─────────────────────┼──────────┤
│ Cliente A           │ [400  ]€ │
│ Cliente B           │ [300  ]€ │
│ Cliente C           │ [300  ]€ │
├─────────────────────┼──────────┤
│ Total Distribuido   │ 1.000€   │ ✅ (Verde)
│ Faltante/Exceso     │ 0€       │
└─────────────────────┴──────────┘

[Cancelar] [Guardar Distribución]
```

- Edita el importe de cada cliente según necesites
- Valida automáticamente que la suma = importe total
- Si suma ≠ total, muestra en ROJO y no permite guardar

---

## 💡 EJEMPLOS PRÁCTICOS

### Ejemplo 1: Venta distribuida entre 3 clientes

```
Año: 2026
Feria: Madrid 2026
Clientes: [Cliente A] [Cliente B] [Cliente C]

Formulario:
├─ Tipo: VENTAS
├─ Categoría: MATERIAL
├─ Descripción: "Venta de stands"
├─ Proveedor: "Estudio XYZ"
├─ Importe: 1.500€
└─ Estado: PAGADO

→ Clickea "Guardar Movimiento"
→ Modal automático ofrece distribución
→ Selecciona "Manual"
→ Ingresa:
   ├─ Cliente A: 700€
   ├─ Cliente B: 500€
   └─ Cliente C: 300€
→ Total = 1.500€ ✅
→ Clickea "Guardar"

Resultado en Firestore:
├─ Documento 1: type=VENTAS, amount=700, clientId=A
├─ Documento 2: type=VENTAS, amount=500, clientId=B
└─ Documento 3: type=VENTAS, amount=300, clientId=C
```

### Ejemplo 2: Gasto distribuido automáticamente

```
Año: 2026
Feria: Barcelona 2026
Clientes: [Cliente X] [Cliente Y]

Formulario:
├─ Tipo: GASTO
├─ Categoría: TRANSPORTE
├─ Descripción: "Flete de material"
├─ Proveedor: "LogísticaX"
├─ Importe: 800€
└─ Estado: PENDIENTE

→ Clickea "Guardar Movimiento"
→ Modal automático abre (modo Automática)
→ Muestra distribución:
   ├─ Cliente X: 400€
   └─ Cliente Y: 400€
→ Clickea "Guardar"

Resultado en Firestore:
├─ Documento 1: type=GASTO, amount=-400, clientId=X
└─ Documento 2: type=GASTO, amount=-400, clientId=Y
```

---

## ⚠️ VALIDACIONES

### ✅ SE PERMITE
- Crear feria con nombre único
- Crear cliente con nombre único
- Seleccionar 1+ clientes
- Guardar movimiento con 1 cliente (sin modal)
- Guardar movimiento con 2+ clientes (abre modal)

### ❌ NO SE PERMITE
- Crear feria sin nombre
- Crear feria con año < 2000
- Crear cliente sin nombre
- Crear cliente duplicado
- Distribuir manual con suma ≠ total
- Guardar distribución si hay errores de validación

---

## 🔧 CAMPOS MODALES

### Modal Crear Feria
```
Nombre [_____________]  (texto, requerido)
Año    [2026________]   (número >= 2000, requerido)
```

### Modal Crear Cliente
```
Nombre [_____________]  (texto, requerido, sin duplicados)
```

### Modal Distribución Automática
```
Total Distribuido:  1.000€
Clientes:          3

Tabla:
├─ Cliente A  →  333€
├─ Cliente B  →  333€
└─ Cliente C  →  334€
```

### Modal Distribución Manual
```
Tabla editable:
├─ Cliente A  [____]€
├─ Cliente B  [____]€
└─ Cliente C  [____]€

Validación:
├─ Total Distribuido: [suma]€
└─ Faltante/Exceso:   [diferencia]€  (rojo si ≠ 0)
```

---

## 📊 COMPARATIVA ANTES/DESPUÉS

### ANTES
- Solo podía cargar datos para 1 cliente a la vez
- Debía crear múltiples movimientos si quería distribuir

### DESPUÉS
- Selecciona múltiples clientes de una sola vez
- Un solo formulario divide automáticamente
- Dos opciones: Automática o Manual
- Crea documentos separados por cliente

---

## 🚀 DESPLEGAR

1. Verifica que los cambios están en `index.html`
2. Commit en git: `git add -A && git commit -m "feat: implement CARGA client distribution"`
3. Push: `git push origin main`
4. Vercel desplegará automáticamente
5. Verifica en https://[tu-app].vercel.app

---

## 📝 ARCHIVOS MODIFICADOS

- ✅ `index.html` - Todos los cambios concentrados aquí
- ✅ `CARGA_FEATURES_IMPLEMENTATION.md` - Documentación técnica completa
- ✅ `QUICK_START_CARGA.md` - Este archivo

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Qué pasa si creo una feria que ya existe?**
R: Te muestra error "Ya existe una feria con ese nombre"

**P: ¿Puedo editar la distribución después de guardar?**
R: No en esta versión. Se guardan como documentos separados.

**P: ¿Qué pasa si distribuyo a 1 solo cliente?**
R: No abre el modal, guarda directamente (comportamiento igual que antes)

**P: ¿Dónde quedan guardados los datos?**
R: En Firestore:
- Ferias → colección `exhibitions`
- Clientes → colección `clients`
- Movimientos → colección `costs` (uno por cliente distribuido)

**P: ¿Puedo cambiar de opinión en el modal?**
R: Sí, puedes ir de Automática a Manual o viceversa (la tabla se actualiza)

**P: ¿Qué pasa si intento guardar sin que la suma sea exacta?**
R: Te muestra un alert indicando el faltante/exceso

---

## 🎓 FLUJO COMPLETO

```
┌─ INICIO: Página CARGA DE DATOS
│
├─ PASO 1: Selecciona AÑO
│          ↓
├─ PASO 2: Selecciona FERIA (o crea con "+" )
│          ↓
├─ PASO 3: Selecciona 1+ CLIENTES (o crea con "+")
│          ↓
├─ PASO 4: Completa FORMULARIO DE MOVIMIENTO
│          ├─ Tipo (VENTAS/GASTO)
│          ├─ Categoría (CARPINTERIA, MONTAJE, etc.)
│          ├─ Descripción
│          ├─ Proveedor
│          ├─ Importe
│          ├─ Estado (PENDIENTE/PAGADO)
│          └─ Fecha
│          ↓
├─ PASO 5: Clickea "GUARDAR MOVIMIENTO"
│          ↓
│         ¿1 solo cliente?  →  SI  →  Guarda directamente
│          │
│          NO (2+ clientes)
│          ↓
├─ PASO 6: Modal de DISTRIBUCIÓN
│          ├─ Elige: AUTOMÁTICA o MANUAL
│          ├─ Automática: Divide por igual
│          ├─ Manual: Ingresa cantidad cada uno
│          └─ Valida suma = total
│          ↓
├─ PASO 7: Clickea "GUARDAR DISTRIBUCIÓN"
│          ↓
├─ PASO 8: Crea N documentos en Firestore
│          (uno por cliente con su cantidad)
│          ↓
├─ PASO 9: Formulario se limpia
│          ↓
└─ FIN: Datos se muestran en tabla
```

---

**Versión:** 1.0.0
**Fecha:** 25 de Marzo de 2026
**Estado:** LISTO PARA PRODUCCIÓN
