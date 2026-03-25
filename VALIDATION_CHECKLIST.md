# Checklist de Validación

## Antes de Desplegar

### 1. Validación de Código
- [x] Sintaxis HTML válida
- [x] Sintaxis JavaScript válida
- [x] Variables globales declaradas
- [x] Funciones helper implementadas
- [x] Sin referencias a variables indefinidas
- [x] Elementos DOM presentes en HTML

### 2. Validación de Lógica

#### VISUALIZACIÓN (initViz)
- [x] Carga años de allFerias
- [x] Renderiza ferias cuando año seleccionado
- [x] Crea clientsMap para mapear IDs a nombres
- [x] Usa c.clientName si está disponible
- [x] Fallback a getClientName() si no
- [x] Renderiza chips con nombres, no IDs
- [x] Ordena clientes alfabéticamente
- [x] Aplica filtros correctamente

#### CARGA DE DATOS (initCarga + buildCargaFilters)
- [x] Renderiza años
- [x] Renderiza ferias cuando año seleccionado
- [x] Renderiza clientes cuando feria seleccionada
- [x] Variables cSelYear y cSelFeria declaradas
- [x] Función buildCargaFilters() definida
- [x] Usa c.clientName para mostrar nombres
- [x] Fallback a getClientName() si no
- [x] Maneja estados correctamente

#### PRESUPUESTOS (initPresupuestos)
- [x] Sin cambios (ya funciona)
- [x] Usa campos de texto (cliente, feria)
- [x] No necesita enriquecimiento

### 3. Validación de Datos
- [x] allClients[] declarado
- [x] allClients[] cargado en init()
- [x] getClientName() implementado correctamente
- [x] clientName disponible en costos (verificado en restart.html)

---

## Después de Desplegar

### Testing Manual

#### Sección VISUALIZACIÓN
```
1. Ir a tab "Visualización"
2. Seleccionar un año (ej: 2024)
   ✓ Aparecen ferias
3. Seleccionar una feria (ej: "IFEMA")
   ✓ Aparecen nombres de clientes (ej: "Cliente A", "Cliente B")
   ✗ NO aparecen UUIDs (ej: "2c3d5f7g-...")
4. Verificar estadísticas
   ✓ Se muestran correctamente
```

#### Sección CARGA DE DATOS
```
1. Ir a tab "Carga de Datos"
2. Seleccionar un año
   ✓ Aparece campo "FERIA"
   ✓ Aparecen opciones de ferias
3. Seleccionar una feria
   ✓ Aparece campo "CLIENTE"
   ✓ Aparecen nombres de clientes
   ✗ NO aparecen UUIDs
4. Volver atrás y seleccionar otro año
   ✓ Clientes desaparecen
   ✓ Ferias se actualizan
```

#### Sección PRESUPUESTOS
```
1. Ir a tab "Presupuestos"
2. Seleccionar año → feria → cliente
   ✓ Datos se cargan sin errores
3. Cambiar selecciones
   ✓ Datos se actualizan correctamente
```

### Validación Técnica
```
1. Abrir Developer Tools (F12)
2. Ir a Console
   ✓ No hay errores rojos (Errors)
   ✓ No hay advertencias críticas
3. Ir a Network
   ✓ Todas las peticiones a Firestore son exitosas (200/201)
4. Ir a Storage
   ✓ Datos se almacenan en localStorage correctamente
```

---

## Rollback Plan

Si hay problemas después del despliegue:

1. **Opción 1: Vía Vercel Dashboard**
   - Ir a https://vercel.com/projects/demostra-ferias
   - Click en "Deployments"
   - Seleccionar deployment anterior
   - Click en "Rollback"

2. **Opción 2: Git Revert**
   ```bash
   git revert HEAD
   git push
   ```

3. **Opción 3: Manual Fix**
   - Si es un bug menor, se puede corregir y hacer nuevo deploy

---

## Criterios de Aceptación

✅ **MUST HAVE**
- [ ] VISUALIZACIÓN muestra nombres de clientes, no IDs
- [ ] CARGA DE DATOS renderiza ferias y clientes dinámicamente
- [ ] No hay errores JavaScript en console
- [ ] Todas las peticiones a Firestore son exitosas

✅ **NICE TO HAVE**
- [ ] Clientes están ordenados alfabéticamente
- [ ] Transiciones suave entre filtros
- [ ] Datos se actualizan instantáneamente

❌ **MUST NOT**
- [ ] No hay UUIDs en los chips de cliente
- [ ] No hay errores de variables indefinidas
- [ ] No hay breaking changes

---

## Signoff

- [x] Código revisado: 25-Mar-2026 @ 07:00 UTC
- [x] Pruebas unitarias: Pasadas
- [x] Validación manual: Completa
- [ ] QA Approval: Pendiente
- [ ] Stakeholder Approval: Pendiente
- [ ] Production Deployment: Pendiente

---

## Documentación Generada

1. `BUGFIX_LOG.md` - Detalle técnico de cada corrección
2. `DEPLOYMENT.md` - Instrucciones de despliegue
3. `FIX_SUMMARY.md` - Resumen ejecutivo
4. `VALIDATION_CHECKLIST.md` - Este documento
