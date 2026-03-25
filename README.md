# 🎪 DEMOSTRA - Sistema de Gestión de Ferias y Presupuestos

Una Single Page Application (SPA) profesional para el seguimiento en tiempo real de presupuestos y costes de ferias y eventos empresariales.

## 📋 Características

### Dashboard
- **Tarjetas de resumen** con KPIs principales:
  - Facturación Total
  - Gastos Previstos
  - Gastos Reales
  - Margen Presupuestado
  - Margen Real

- **Filtros avanzados** por nombre de feria y cliente
- **Tabla comparativa** de todas las ferias con indicadores de margen

### Gestión de Ferias
- Crear nuevas ferias con datos de presupuesto
- Ver resumen de cada feria (cliente, ubicación, stands, año)
- Editar y eliminar ferias
- Acceso rápido a costes asociados

### Seguimiento de Costes
- Registrar costes reales por categoría
- Categorías predefinidas: CARPINTERIA, MONTAJE, ELECTRICIDAD, GASTOS VIAJE, GRAFICA, MATERIAL, TRANSPORTE, SERVICIOS FERIALES, OTROS
- Cálculos automáticos de:
  - **Gastos GG** (7% del total de costes)
  - **Imprevistos** (3% del total de costes)
- Visualización de desviaciones presupuesto vs real
- Tabla de costes detallada con posibilidad de eliminar

### Análisis
- **Gráfico comparativo** (presupuestado vs real) por categoría
- **Análisis por categoría** con desviación porcentual
- Alertas visuales (rojo si se supera presupuesto, verde si está controlado)
- Indicadores de margen con objetivos de 40-55%

## 🚀 Cómo usar

### Opción 1: Abrir en navegador (Más simple)
```bash
# Abre el archivo en tu navegador (la aplicación está lista para usar)
open app.html
```

### Opción 2: Usar con React (para desarrollo)
```bash
# Si tienes un proyecto React configurado
import ExhibitionBudgetApp from './ExhibitionBudgetApp.jsx'
```

## 📊 Datos de ejemplo

La aplicación viene precargada con datos de ferias iniciales:

| Feria | Cliente | Ubicación | Stands | Venta Ppto | Coste Ppto |
|-------|---------|-----------|--------|------------|------------|
| HIP 2026 | FARM FRITS | MD | 1 | €27,000 | €13,500 |
| ALIMENTARIA | Client1 | BCN | 1 | €20,000 | €7,000 |
| SEAFOOD BCN | Client2 | BCN | 7 | €315,000 | €160,891 |
| NAVALIA | Client3 | Local | 8 | €120,000 | €54,415 |
| MARMOMAC | Client4 | INT | 2 | €60,000 | €34,412 |
| SMART CITY | Client5 | BCN | 3 | €135,000 | €63,644 |

Y costes iniciales registrados para seguimiento.

## 🎨 Diseño

- **Colores corporativos DEMOSTRA**:
  - Azul oscuro (#1e3a8a) - Primario
  - Naranja (#f97316) - Secundario/Acciones
  - Verde (#16a34a) - Éxito
  - Rojo (#dc2626) - Alertas

- **Interfaz responsiva** (móvil, tablet, desktop)
- **Tablas interactivas** con hover effects
- **Tarjetas destacadas** con bordes laterales de color
- **Gráficos profesionales** con Recharts

## 🔢 Reglas de Negocio

### Cálculo de Márgenes
```
Margen Presupuestado = Venta Ppto - Coste Ppto
Margen Real = Venta Ppto + Costes Reales - Gastos GG - Imprevistos
```

### Porcentaje de Margen
```
Margen % = (Margen Real / Venta) × 100
Objetivo: 40-55%
```

### Detalles de costes
- **Costes GG**: 7% sobre total de costes reales (Gastos Generales)
- **Imprevistos**: 3% sobre total de costes reales
- Estos se calculan automáticamente al registrar costes

## 📝 Flujo de trabajo recomendado

1. **Inicio**: Ve al Dashboard para ver resumen general
2. **Crear Feria**: En tab "Ferias", crea nuevas ferias con presupuesto
3. **Registrar Costes**: En tab "Costes", selecciona feria y añade costes reales
4. **Analizar**: En tab "Análisis" visualiza desviaciones y alertas
5. **Exportar**: Los datos pueden ser exportados para reportes (futura mejora)

## 🛠️ Dependencias

- **React 18** - Framework UI
- **Recharts 2.10** - Gráficos
- **Tailwind CSS** - Estilos
- **Babel** - Transpilación JSX

Todas las dependencias están incluidas como CDN, no necesitas instalar nada.

## 💡 Consejos de uso

1. **Filtros de Dashboard**: Usa los filtros para enfocarte en ferias o clientes específicos
2. **Seguimiento en Tiempo Real**: Añade costes conforme se generan para mantener datos actualizados
3. **Análisis de Desviaciones**: Revisa regularmente tab de Análisis para identificar sobrecostes
4. **Objetivos de Margen**: Mantén el margen por encima del 40% según objetivos de la empresa

## 🔒 Almacenamiento

Los datos se guardan en memoria durante la sesión. Para persistencia, puedes:
- Integrar con base de datos backend
- Exportar a Excel/CSV
- Usar localStorage para persistencia local

## 📱 Compatibilidad

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Responsive en móvil y tablet

## 🚧 Mejoras futuras

- [ ] Exportar a Excel con formato profesional
- [ ] Importar datos desde archivos Excel
- [ ] Gráficos de tendencia temporal
- [ ] Alertas y notificaciones
- [ ] Autenticación y multi-usuario
- [ ] Base de datos persistente
- [ ] Genera reportes PDF
- [ ] Integración con sistemas contables

## 📧 Soporte

Para mejoras o reportar problemas, contacta con el equipo de DEMOSTRA.

---

**Versión**: 1.0
**Fecha**: Marzo 2026
**Desarrollado para**: DEMOSTRA - Eventos y Ferias
