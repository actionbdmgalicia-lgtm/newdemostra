# Guía de Despliegue - Asignación de Clientes a Ferias

## Estado Actual

✅ **Implementación completada y probada localmente**

## Cambios Principales

1. **Nueva colección Firestore**: `clientFeriaAssignments`
2. **Función nueva**: `assignClientToFeria(clientId, feriaId)`
3. **Interfaz mejorada**: Separación de clientes asignados vs. no asignados en CARGA
4. **Auto-asignación**: Clientes se asignan automáticamente al crear o guardar gastos

## Pasos para Desplegar

### Opción 1: Manual (Recomendado)

```bash
# 1. Ir al directorio del proyecto
cd /Users/maccuatro/PROGRAMACION/CLAUDE/DEMOSTRA

# 2. Verificar cambios
git diff index.html

# 3. Si usas git (si no, salta al paso 4)
git add index.html
git commit -m "feat: add client-feria assignment system for CARGA section"
git push origin main

# 4. Si usas Vercel CLI (si no está configurado, ver paso 6)
vercel --prod

# 5. Verificar que el despliegue fue exitoso
# La URL aparecerá en la terminal o en el panel de Vercel
```

### Opción 2: GitHub (si está conectado)

1. Empujar cambios a GitHub:
   ```bash
   git push origin main
   ```

2. Vercel auto-despliega automáticamente

3. Ver estado en: https://vercel.com/[tu-usuario]/demostra

### Opción 3: Interfaz de Vercel

1. Ir a: https://vercel.com/dashboard
2. Seleccionar proyecto "demostra"
3. El despliegue debe estar en progreso
4. Esperar a que complete

## Verificación Post-Despliegue

### Test 1: Asignación automática al crear cliente
- [ ] Ir a CARGA
- [ ] Seleccionar Año y Feria
- [ ] Click "+ NUEVO CLIENTE"
- [ ] Crear cliente nuevo
- [ ] ✓ Cliente debe aparecer en "ASIGNADOS A ESTA FERIA"

### Test 2: Asignación automática al guardar gasto
- [ ] Ir a CARGA
- [ ] Seleccionar cliente de "DE OTRAS FERIAS"
- [ ] Llenar y guardar gasto
- [ ] ✓ Cliente debe aparecer en "ASIGNADOS A ESTA FERIA"

### Test 3: Distribución de gastos
- [ ] Seleccionar 2+ clientes
- [ ] Guardar gasto
- [ ] Modal de distribución debe aparecer
- [ ] ✓ Todos deben quedar asignados

### Test 4: Compatibilidad hacia atrás
- [ ] Clientes antiguos sin asignación deben funcionar normalmente
- [ ] Sistema no debe crash

## Rollback (Si hay problemas)

```bash
# 1. Ver histórico (si está en Git)
git log --oneline | head -5

# 2. Revertir al commit anterior
git revert [commit-hash]
git push origin main

# 3. O restaurar archivo manualmente
cp index.html.backup index.html
# Luego desplegar
```

## Monitoreo

### Console de Firestore
1. Ir a: https://console.firebase.google.com
2. Proyecto: demostrapp-b14c9
3. Firestore Database
4. Buscar colección: `clientFeriaAssignments`
5. ✓ Debe haber registros nuevos después de usar la app

### Console del Navegador
- Abrir DevTools (F12)
- Ir a "Console"
- ✓ No debe haber errores JavaScript rojo
- ✓ Ver logs: "Cliente asignado a feria: ..."

### Performance
- La carga inicial debe ser similar a antes
- Las asignaciones se cargan una sola vez

## Variables de Entorno

No se requieren cambios en variables de entorno.

## Dependencias

- Firebase Firestore: ✓ Ya existe
- Versión mínima requerida: 9.22.0 (ya instalada)

## Archivos Modificados

```
/index.html - ~280 líneas nuevas/modificadas
/CARGA_FIX_IMPLEMENTATION.md - Documentación (nuevo)
/DEPLOY_GUIDE.md - Esta guía (nuevo)
```

## Tiempo de Despliegue

- Vercel: ~1-2 minutos desde push hasta live
- Total incluyendo tests: ~10-15 minutos

## Contactos/Referencias

- **Firebase Console**: https://console.firebase.google.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentación**: CARGA_FIX_IMPLEMENTATION.md

## Checklist Final

Antes de considerar completado:

- [ ] Código compilado sin errores
- [ ] Tests manuales pasaron (4 tests arriba)
- [ ] Firestore tiene registros en `clientFeriaAssignments`
- [ ] No hay errores en console del navegador
- [ ] Clientes antiguos funcionan normalmente
- [ ] Performance es aceptable
- [ ] Documentación actualizada

---

**Fecha de Despliegue**: 2026-03-25
**Implementado por**: Claude Code
**Estado**: Listo para despliegue
