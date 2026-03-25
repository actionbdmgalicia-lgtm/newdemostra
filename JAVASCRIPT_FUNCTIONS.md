# JavaScript Functions - Demostra Ferias App

## Funciones Implementadas

### 1. Formatting (fmt)
- **fmt(v, type)**: Función universal de formateo
  - `type='currency'`: Formatea números sin decimales en formato español (1,042,533€)
  - `type='percent'`: Formatea porcentajes con 1 decimal (28.8%)

### 2. Autenticación (AUTH)
- **handleLogin(e)**: Maneja el login con Firebase
- **handleLogout()**: Cierra sesión
- **checkAdminStatus()**: Verifica si el usuario es admin

### 3. Dashboard
- **init()**: Carga ferias y costos desde Firestore
- **loadDashboard()**: Renderiza las métricas del dashboard
  - Ingresos, Gastos, Margen, % Margen

### 4. Visualización (Costes/Ventas)
- **initViz()**: Inicializa la sección de visualización con filtros cascada
  - Año → Feria → Cliente (cascading filters)
- **renderChips(id, items, labelFn, isOnFn, onClick)**: Renderiza botones de filtro
- **applyFilters()**: Aplica los filtros seleccionados y calcula stats
- **renderStats(costs)**: Calcula y muestra ingresos, gastos, margen, % margen

### 5. Carga de Datos
- **initCarga()**: Inicializa la sección de carga de datos con cascading filters

### 6. Presupuestos
- **initPresupuestos()**: Carga presupuestos desde Firestore y renderiza filtros
- **buildPptoFilters()**: Construye los filtros cascada año→feria→cliente para presupuestos
- **applyPptoFilters()**: Aplica los filtros y renderiza la vista actual
- **renderPresupuestosCrear(pptosFiltered)**: Muestra tarjetas de presupuestos existentes
- **renderPresupuestosVer(pptosFiltered)**: Muestra tabla con stats de presupuestos
  - Ingresos, Gastos, Margen, % Margen
- **renderPresupuestosAvance(pptosFiltered)**: Compara presupuesto vs real
  - Presupuesto vs Real, Desviación, % Desviación
- **savePptoPartida()**: Guarda una nueva partida de presupuesto en Firestore

### 7. Navegación
- **switchPage(page)**: Cambia de sección (viz, carga, presupuestos, admin)
- **switchPptoSub(sub)**: Cambia entre subtabs de presupuestos (crear, ver, avance)

### 8. Admin
- **createAdminUser()**: Funcionalidad en desarrollo
- **loadAdminUsers()**: Carga lista de usuarios admin

### 9. Modales
- **closeModal(id)**: Cierra un modal
- **openArchiveModal(col, id, name)**: Abre modal de confirmación de borrado
- **checkArchiveInput()**: Valida que se escriba "CONFIRMO BORRADO"
- **executeArchive()**: Ejecuta el borrado
- **updateFeria()**: Actualiza datos de feria

## Estructura de Datos

### Ferias (exhibitions)
```javascript
{
  id: string,
  year: number,
  name: string,
  // otros campos
}
```

### Costos (costs)
```javascript
{
  id: string,
  feriaId: string,
  clientId: string,
  amount: number,
  type: string (VENTAS, TRANSPORTE, etc),
  // otros campos
}
```

### Presupuestos (budgets)
```javascript
{
  id: string,
  year: number,
  feria: string,
  cliente: string,
  descripcion: string,
  tipo: string (1. INGRESO, 2. GASTO),
  categoria: string,
  importe: number,
  createdAt: timestamp
}
```

## Variables Globales

- `allFerias[]`: Array de ferias
- `allCosts[]`: Array de costos
- `allBudgets[]`: Array de presupuestos
- `selYears`, `selFerias`, `selClients`: Sets de selecciones actuales
- `pptoSelYears`, `pptoSelFerias`, `pptoSelClientes`: Sets de selecciones de presupuestos
- `currentUser`: Usuario autenticado
- `isAdmin`: Boolean de estado admin
- `pptoLoaded`: Boolean para caché de presupuestos
- `pptoSubActual`: Subtab actual de presupuestos

## Características Principales

✅ Autenticación Firebase completa
✅ Filtros cascada (año→feria→cliente) para costes
✅ Filtros cascada (año→feria→cliente) para presupuestos
✅ Cálculo de ingresos, gastos, margen, % margen
✅ Comparación presupuesto vs real
✅ Formateo automático de números (sin decimales) y porcentajes (1 decimal)
✅ Modal de confirmación para borrados
✅ Integración con Firestore
✅ Panel admin para gestión de usuarios
