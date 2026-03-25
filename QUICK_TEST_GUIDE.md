# Guía Rápida de Testing - Sistema de Asignación Cliente-Feria

## ⏱️ Tiempo Estimado: 10 minutos

## 🚀 Setup Previo

1. Abrir aplicación en navegador
2. Login con credenciales
3. Ir a sección "CARGA"
4. Abrir DevTools (F12) → Console

## 📋 Test 1: Asignación Automática al Crear Cliente (2 min)

**Objetivo**: Verificar que un cliente nuevo se asigna automáticamente a la feria seleccionada

**Pasos**:
1. Seleccionar un AÑO cualquiera
2. Seleccionar una FERIA cualquiera
3. En sección de clientes, click en "+ NUEVO CLIENTE"
4. Ingresar nombre: "TEST_CLIENT_01"
5. Esperar confirmación ✓
6. **Esperado**: Cliente aparece en "📌 ASIGNADOS A ESTA FERIA"

**Validación Console**:
```javascript
// En consola, busca este log:
"Cliente asignado a feria: client_id, feria_id"
```

---

## 📋 Test 2: Asignación con Click (2 min)

**Objetivo**: Verificar que click en cliente no asignado lo asigna automáticamente

**Pasos**:
1. Seleccionar AÑO y FERIA diferentes a Test 1
2. Observar clientes en "DE OTRAS FERIAS"
3. Click en un cliente de esa sección
4. **Esperado**:
   - Cliente desaparece de "DE OTRAS FERIAS"
   - Cliente aparece en "ASIGNADOS A ESTA FERIA"
   - Cliente queda seleccionado (azul)

**Validación**:
- [ ] Cliente movido de una sección a otra
- [ ] Cliente queda seleccionado
- [ ] No hay errores en console

---

## 📋 Test 3: Auto-Asignación al Guardar Gasto (3 min)

**Objetivo**: Verificar que al guardar un gasto, cliente no asignado se asigna automáticamente

**Pasos**:
1. Seleccionar AÑO y FERIA
2. Seleccionar un cliente que NO esté en "ASIGNADOS"
3. Llenar formulario:
   - Tipo: VENTAS
   - Categoría: CARPINTERIA
   - Descripción: "TEST_VENTA"
   - Proveedor: "TEST_PROVIDER"
   - Importe: 100
   - Fecha: Hoy
4. Click "Guardar Movimiento"
5. Esperar confirmación
6. **Verificar**: Cambiar a otra feria y volver
7. **Esperado**: Cliente está en "ASIGNADOS A ESTA FERIA"

**Validación**:
- [ ] Gasto se guardó (✓ mensaje)
- [ ] Cliente quedó asignado
- [ ] No hay errores

---

## 📋 Test 4: Distribución Múltiple (3 min)

**Objetivo**: Verificar que distribución asigna todos los clientes

**Pasos**:
1. Seleccionar AÑO y FERIA
2. Seleccionar 2 o más CLIENTES (del área de chips)
3. Llenar formulario:
   - Tipo: GASTO
   - Categoría: MONTAJE
   - Descripción: "TEST_DISTRIBUIR"
   - Proveedor: "TEST"
   - Importe: 300
4. Click "Guardar"
5. **Aparece modal**: "Distribuir 300€ entre 2 clientes"
6. Verificar distribución automática (150 c/u)
7. Click "Aplicar Distribución"
8. **Esperado**: Todos los clientes quedan asignados

**Validación**:
- [ ] Modal de distribución aparece
- [ ] Cálculo correcto
- [ ] Gastos aparecen en resumen
- [ ] Todos asignados

---

## 📋 Test 5: Verificación en Firestore (2 min)

**Objetivo**: Confirmar que datos se guardaron en Firestore

**Pasos**:
1. Abrir consola Firebase: https://console.firebase.google.com
2. Proyecto: demostrapp-b14c9
3. Firestore Database
4. Click en colección "clientFeriaAssignments"
5. **Esperado**: Ver registros con estructura:
   ```
   {
     clientId: "...",
     feriaIds: [...],
     createdAt: timestamp,
     ...
   }
   ```

**Validación**:
- [ ] Colección existe
- [ ] Tiene registros nuevos
- [ ] Estructura correcta
- [ ] Timestamps son recientes

---

## ❌ Pruebas de Error (Opcional)

### Error Test 1: Cliente no existe
```
Seleccionar cliente inexistente
Guardar gasto
→ Debe mostrar error específico
```

### Error Test 2: Feria no existe
```
Seleccionar año pero no feria
Intentar guardar
→ Debe mostrar "Feria no encontrada"
```

---

## 🔍 Checklist de Validación

### Antes de considerar "Pasado"

- [ ] Los 5 tests principales completados SIN ERRORES
- [ ] Console no muestra errores rojo
- [ ] Firestore tiene nuevos datos en `clientFeriaAssignments`
- [ ] UI responde rápido (<1s)
- [ ] No hay latencia visible
- [ ] Clientes antiguos funcionan

### Performance Check

Abrir DevTools → Network:
- Firestore read: <500ms
- Firestore write: <1s
- DOM render: <200ms

---

## 🐛 Si Hay Errores

### Error: "AssertionError: clientFeriaAssignments is undefined"
```
Solución: Recargar página (F5) y reintentar
```

### Error: "Permission denied for clientFeriaAssignments"
```
Solución: Verificar Firestore rules en Console
La colección se crea automáticamente con permisos heredados
```

### Error: "Client not found"
```
Solución: Verificar que cliente existe en colección "clients"
Crear cliente nuevo y reintentar
```

### UI: Cliente no aparece en "ASIGNADOS"
```
Solución: Recargar página (F5)
Si persiste: Verificar Firestore manualmente
```

---

## 📱 Testing en Diferentes Dispositivos

Recomendado probar en:
- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Tablet (iPad)
- [ ] Mobile (iPhone)

### Notas de Responsive
- UI debería adaptarse bien en tablets
- Mobile: Chips pueden necesitar scroll horizontal

---

## 📊 Resultado Esperado Final

```
ANTES:
- Filtrar por feria → solo clientes existentes
- No hay opción de asignar clientes nuevos
- Flujo lento y manual

DESPUÉS:
- Filtrar por feria → clientes asignados + opción para otros
- Auto-asignación al crear/guardar
- Flujo rápido e intuitivo

VALIDACIÓN: ✓ Todos los 5 tests pasaron sin errores
```

---

## 🎯 Resumen Rápido

| Test | ¿Pasó? | Notas |
|------|--------|-------|
| T1: Crear cliente | [ ] | Auto-asigna |
| T2: Click-to-assign | [ ] | Cliente se mueve |
| T3: Guardar gasto | [ ] | Auto-asigna al guardar |
| T4: Distribución | [ ] | Asigna todos |
| T5: Firestore | [ ] | Datos presentes |

---

**Duración Total**: ~10 minutos
**Dificultad**: Fácil
**Requiere**: Acceso a app + Firestore console

Cuando termines todos los tests, el sistema está **LISTO PARA PRODUCCIÓN** ✅
