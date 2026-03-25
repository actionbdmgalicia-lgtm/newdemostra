/**
 * IMPORT PRESUPUESTOS FROM EXCEL
 * Importa presupuestos de SEAFOOD desde Excel a Firestore
 * Valida duplicados y categorías antes de importar
 */

// Datos de presupuestos extraídos del Excel SEAFOOD
// Datos de presupuestos extraídos del Excel SEAFOOD
const PRESUPUESTOS_SEAFOOD = [
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'APOLO',
    tipo: '1. INGRESO',
    categoria: 'VENTA',
    detalle: null,
    importe: 35000,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'APOLO',
    tipo: '2. GASTO',
    categoria: 'CARPINTERIA',
    detalle: 'OTROS',
    importe: -1200,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'CARPINTERIA',
    detalle: 'OTROS',
    importe: -900,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'CARPINTERIA',
    detalle: 'OTROS',
    importe: -2436,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'CARPINTERIA',
    detalle: 'OTROS',
    importe: -900,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'CARPINTERIA',
    detalle: 'OTROS',
    importe: -1500,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'CARPINTERIA',
    detalle: 'ALMACENJ',
    importe: -8390,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'CARPINTERIA',
    detalle: 'VIGA l BARROTES',
    importe: -1900,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'CARPINTERIA',
    detalle: 'totem font',
    importe: -2500,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'CARPINTERIA',
    detalle: 'COLGANTES PEQ',
    importe: -2007,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'MONTAJE',
    detalle: 'MONTAJE',
    importe: -6000,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'MONTAJE',
    detalle: 'MONTAJE',
    importe: -16050,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'MONTAJE',
    detalle: 'MONTAJE',
    importe: -3250,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'MONTAJE',
    detalle: 'MONTAJE',
    importe: -3250,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'MONTAJE',
    detalle: 'DESMONTAJE',
    importe: -250,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'MONTAJE',
    detalle: 'DESMONTAJE',
    importe: -750,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'MONTAJE',
    detalle: 'DESMONTAJE',
    importe: -750,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'MONTAJE',
    detalle: 'VARIOS ',
    importe: -500,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'MONTAJE',
    detalle: 'VARIOS ',
    importe: -750,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'MONTAJE',
    detalle: 'VARIOS ',
    importe: -750,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'MATERIAL',
    detalle: 'ACABADO SUELO',
    importe: -1700,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'MATERIAL',
    detalle: 'ACABADO SUELO',
    importe: -270,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'MATERIAL',
    detalle: 'ACABADO SUELO',
    importe: -270,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'MATERIAL',
    detalle: 'ACABADO SUELO',
    importe: -2000,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'MATERIAL',
    detalle: 'HERRAJES',
    importe: -4860,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'MATERIAL',
    detalle: 'HERRAJES',
    importe: -250,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'MATERIAL',
    detalle: 'HERRAJES',
    importe: -96,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'APOLO',
    tipo: '2. GASTO',
    categoria: 'TRANSPORTE',
    detalle: 'TRANSPORTE',
    importe: -1700,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'TRANSPORTE',
    detalle: 'TRANSPORTE',
    importe: -1700,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'TRANSPORTE',
    detalle: 'TRANSPORTE',
    importe: -800,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'TRANSPORTE',
    detalle: 'TRANSPORTE',
    importe: -800,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'APOLO',
    tipo: '2. GASTO',
    categoria: 'TRANSPORTE',
    detalle: 'TRANSPORTE',
    importe: -1700,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'TRANSPORTE',
    detalle: 'TRANSPORTE',
    importe: -1700,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'TRANSPORTE',
    detalle: 'TRANSPORTE',
    importe: -800,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'TRANSPORTE',
    detalle: 'TRANSPORTE',
    importe: -800,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'APOLO',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'HOTEL',
    importe: -450,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'HOTEL',
    importe: -450,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'HOTEL',
    importe: -450,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'HOTEL',
    importe: -450,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'APOLO',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'VUELOS',
    importe: -150,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'VUELOS',
    importe: -150,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'VUELOS',
    importe: -150,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'VUELOS',
    importe: -150,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'APOLO',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'TAXI/COCHE',
    importe: -150,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'TAXI/COCHE',
    importe: -150,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'TAXI/COCHE',
    importe: -450,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'TAXI/COCHE',
    importe: -150,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'TAXI/COCHE',
    importe: -150,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'APOLO',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'TRASLADOS AEROPUERTO',
    importe: -50,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'TRASLADOS AEROPUERTO',
    importe: -50,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'TRASLADOS AEROPUERTO',
    importe: -50,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'TRASLADOS AEROPUERTO',
    importe: -50,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'TRASLADOS AEROPUERTO',
    importe: -50,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'DIETAS',
    importe: -500,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'DIETAS',
    importe: -500,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'DIETAS',
    importe: -500,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'GASTOS VIAJE',
    detalle: 'DIETAS',
    importe: -500,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'MOB ALQ',
    detalle: 'TRUSS',
    importe: -780,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'MOB ALQ',
    detalle: 'TRUSS',
    importe: -780,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'MOB ALQ',
    detalle: 'TRUSS',
    importe: -780,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'MOB ALQ',
    detalle: null,
    importe: -810,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'MOB ALQ',
    detalle: null,
    importe: -810,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'ELECTRICIDAD',
    detalle: 'tekox + enchufes',
    importe: -1620,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'ELECTRICIDAD',
    detalle: 'tekox + enchufes',
    importe: -350,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'ELECTRICIDAD',
    detalle: 'tekox + enchufes',
    importe: -1620,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'ELECTRICIDAD',
    detalle: 'tekox + enchufes',
    importe: -1620,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'APOLO',
    tipo: '2. GASTO',
    categoria: 'ELECTRICIDAD',
    detalle: 'cables y varios',
    importe: -240,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'ELECTRICIDAD',
    detalle: 'cables y varios',
    importe: -240,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'ELECTRICIDAD',
    detalle: 'cables y varios',
    importe: -240,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'ELECTRICIDAD',
    detalle: 'cables y varios',
    importe: -240,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'GRAFICA',
    detalle: 'PRODUCCION',
    importe: -5000,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'GRAFICA',
    detalle: 'PRODUCCION',
    importe: -1300,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'GRAFICA',
    detalle: 'PRODUCCION',
    importe: -1300,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'APOLO',
    tipo: '2. GASTO',
    categoria: 'GRAFICA',
    detalle: 'INSTALACION',
    importe: -600,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'GRAFICA',
    detalle: 'INSTALACION',
    importe: -1500,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'GRAFICA',
    detalle: 'INSTALACION',
    importe: -750,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'GRAFICA',
    detalle: 'INSTALACION',
    importe: -600,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'GRAFICA',
    detalle: 'INSTALACION',
    importe: -600,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'GRAFICA',
    detalle: 'TEXTIL colg ',
    importe: -150,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'GRAFICA',
    detalle: 'TEXTIL colg ',
    importe: -150,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'GASTOS GG',
    detalle: 'DISEÑO',
    importe: -450,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'GASTOS GG',
    detalle: 'DISEÑO',
    importe: -450,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'GASTOS GG',
    detalle: 'DISEÑO',
    importe: -450,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'GASTOS GG',
    detalle: 'DISEÑO',
    importe: -450,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'PESCAPUERTA',
    tipo: '2. GASTO',
    categoria: 'GASTOS GG',
    detalle: 'IMPREVISTOS (3% resto gastos)',
    importe: -432.47999999999996,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CABOMAR',
    tipo: '2. GASTO',
    categoria: 'GASTOS GG',
    detalle: 'IMPREVISTOS (3% resto gastos)',
    importe: -432.47999999999996,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: '2. GASTO',
    categoria: 'GASTOS GG',
    detalle: 'IMPREVISTOS (3% resto gastos)',
    importe: -432.47999999999996,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: '2. GASTO',
    categoria: 'GASTOS GG',
    detalle: 'IMPREVISTOS (3% resto gastos)',
    importe: -432.47999999999996,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'NEW CONCISA',
    tipo: 'TOTAL',
    categoria: 'TOTAL',
    detalle: 'TOTAL GASTOS',
    importe: -16307.6,
    estado: 'ACTIVO'
  },
  {
    feria: 'SEAFOOD',
    año: 2026,
    cliente: 'CAMANCHACA',
    tipo: 'TOTAL',
    categoria: 'TOTAL',
    detalle: 'TOTAL GASTOS',
    importe: -16307.6,
    estado: 'ACTIVO'
  }
];

async function openImportPresupuestosModal() {
  const modalHtml = `
    <div id="importPresupuestosModal" style="display:flex;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1000;justify-content:center;align-items:center;padding:20px;">
      <div style="background:#ffffff;border-radius:12px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1);max-width:600px;width:100%;max-height:90vh;overflow-y:auto;">
        <!-- Header -->
        <div style="padding:24px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;">
          <h2 style="font-size:18px;font-weight:700;color:#1f2937;margin:0;">Importar Presupuestos SEAFOOD</h2>
          <button onclick="closeImportPresupuestosModal()" style="background:none;border:none;font-size:24px;cursor:pointer;color:#6b7280;">×</button>
        </div>

        <!-- Body -->
        <div style="padding:24px;">
          <div id="importProgress" style="display:none;">
            <div style="background:#f0f9ff;padding:16px;border-radius:8px;border-left:4px solid #3b82f6;margin-bottom:16px;">
              <div style="font-size:12px;font-weight:600;color:#1e40af;text-transform:uppercase;margin-bottom:8px;">Procesando importación...</div>
              <div style="background:rgba(255,255,255,0.5);height:8px;border-radius:4px;overflow:hidden;">
                <div id="importProgressBar" style="height:100%;background:#3b82f6;width:0%;transition:width 0.3s;"></div>
              </div>
              <div id="importStatus" style="font-size:12px;color:#6b7280;margin-top:8px;">Inicializando...</div>
            </div>
          </div>

          <div id="importForm">
            <div style="background:#f8f9fa;padding:16px;border-radius:8px;border-left:4px solid #e3a017;margin-bottom:16px;">
              <div style="font-size:12px;font-weight:600;color:#92400e;text-transform:uppercase;margin-bottom:8px;">📋 INFORMACIÓN</div>
              <div style="font-size:13px;color:#6b7280;line-height:1.6;">
                Se importarán <strong>${PRESUPUESTOS_SEAFOOD.length} presupuestos</strong> de la feria SEAFOOD 2026.
                <br><br>
                <strong>Validación:</strong>
                <ul style="margin:8px 0 0 16px;">
                  <li>No se sobrescribirán presupuestos existentes</li>
                  <li>Se validarán categorías contra COST_CATEGORIES</li>
                  <li>Se detectarán y omitirán duplicados</li>
                </ul>
              </div>
            </div>

            <div id="importResults" style="display:none;margin-bottom:16px;">
              <div style="background:#f0fdf4;padding:16px;border-radius:8px;border-left:4px solid #10b981;">
                <div style="font-size:12px;font-weight:600;color:#065f46;text-transform:uppercase;margin-bottom:8px;">✓ Importación Completada</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                  <div>
                    <div style="font-size:11px;color:#6b7280;">Importados</div>
                    <div id="resultImported" style="font-size:20px;font-weight:700;color:#10b981;">0</div>
                  </div>
                  <div>
                    <div style="font-size:11px;color:#6b7280;">Duplicados</div>
                    <div id="resultDuplicates" style="font-size:20px;font-weight:700;color:#f59e0b;">0</div>
                  </div>
                  <div>
                    <div style="font-size:11px;color:#6b7280;">Errores</div>
                    <div id="resultErrors" style="font-size:20px;font-weight:700;color:#ef4444;">0</div>
                  </div>
                  <div>
                    <div style="font-size:11px;color:#6b7280;">Total Procesados</div>
                    <div id="resultTotal" style="font-size:20px;font-weight:700;color:#3b82f6;">0</div>
                  </div>
                </div>
                <div id="resultDetails" style="margin-top:16px;font-size:12px;color:#6b7280;max-height:200px;overflow-y:auto;"></div>
              </div>
            </div>
          </div>

          <!-- Botones -->
          <div style="display:flex;gap:12px;justify-content:flex-end;">
            <button onclick="closeImportPresupuestosModal()" class="btn btn-secondary">Cerrar</button>
            <button id="importBtn" onclick="importPresupuestos()" class="btn btn-primary">Importar Ahora</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Insertar modal en el DOM
  const container = document.createElement('div');
  container.innerHTML = modalHtml;
  document.body.appendChild(container);
}

function closeImportPresupuestosModal() {
  const modal = document.getElementById('importPresupuestosModal');
  if (modal) {
    modal.parentElement.remove();
  }
}

async function importPresupuestos() {
  const importBtn = document.getElementById('importBtn');
  const importForm = document.getElementById('importForm');
  const importProgress = document.getElementById('importProgress');
  const importResults = document.getElementById('importResults');
  const importStatus = document.getElementById('importStatus');
  const importProgressBar = document.getElementById('importProgressBar');

  importBtn.disabled = true;
  importBtn.style.opacity = '0.6';
  importBtn.style.cursor = 'not-allowed';
  importForm.style.display = 'none';
  importProgress.style.display = 'block';
  importResults.style.display = 'none';

  let imported = 0;
  let duplicates = 0;
  let errors = 0;

  try {
    // Obtener presupuestos existentes para validación
    const existingQuery = await db.collection('budgets')
      .where('feria', '==', 'SEAFOOD')
      .where('año', '==', 2026)
      .get();

    const existingMap = new Map();
    existingQuery.docs.forEach(doc => {
      const data = doc.data();
      const key = `${data.cliente}|${data.tipo}|${data.categoria}|${data.descripcion}`;
      existingMap.set(key, true);
    });

    // Mapear categorías del Excel a categorías del sistema
    const categoryMap = {
      'VENTA': 'OTROS',
      'CARPINTERIA': 'CARPINTERIA',
      'ELECTRICIDAD': 'ELECTRICIDAD',
      'PINTURA': 'GRAFICA',
      'HERRERIA': 'CARPINTERIA',
      'PLOMERIA': 'SERVICIOS FERIALES',
      'VIDRIOS': 'MATERIAL',
      'DECORACION': 'MATERIAL',
      'TRANSPORTE': 'TRANSPORTE',
      'INSTALACION': 'SERVICIOS FERIALES',
      'MANO DE OBRA': 'GASTOS VIAJE',
      'MATERIALES': 'MATERIAL',
      'ALQUILER': 'ALQUILER',
      'SERVICIOS': 'SERVICIOS FERIALES'
    };

    // Procesar cada presupuesto
    for (let i = 0; i < PRESUPUESTOS_SEAFOOD.length; i++) {
      try {
        const ppto = PRESUPUESTOS_SEAFOOD[i];

        // Mapear y validar categoría
        let categoria = categoryMap[ppto.categoria] || 'OTROS';
        if (!COST_CATEGORIES.includes(categoria)) {
          categoria = 'OTROS';
        }

        // Crear clave de duplicidad
        const descripcion = ppto.detalle || ppto.categoria;
        const key = `${ppto.cliente}|${ppto.tipo}|${categoria}|${descripcion}`;

        // Verificar duplicado
        if (existingMap.has(key)) {
          duplicates++;
          importStatus.innerHTML = `Procesado ${i + 1}/${PRESUPUESTOS_SEAFOOD.length} - ${duplicates} duplicados detectados`;
          importProgressBar.style.width = ((i + 1) / PRESUPUESTOS_SEAFOOD.length * 100) + '%';
          continue;
        }

        // Preparar documento
        const doc = {
          year: ppto.año,
          feria: ppto.feria,
          cliente: ppto.cliente,
          tipo: ppto.tipo,
          categoria: categoria,
          descripcion: descripcion,
          importe: Math.abs(ppto.importe),
          status: ppto.estado,
          createdAt: new Date(),
          createdBy: 'import@demostra.com'
        };

        // Importar a Firestore
        await db.collection('budgets').add(doc);
        imported++;
        existingMap.set(key, true);

        importStatus.innerHTML = `Procesado ${i + 1}/${PRESUPUESTOS_SEAFOOD.length} - ${imported} importados`;
        importProgressBar.style.width = ((i + 1) / PRESUPUESTOS_SEAFOOD.length * 100) + '%';

      } catch (err) {
        console.error('Error importando presupuesto:', err);
        errors++;
        importStatus.innerHTML = `Procesado ${i + 1}/${PRESUPUESTOS_SEAFOOD.length} - ${errors} errores`;
        importProgressBar.style.width = ((i + 1) / PRESUPUESTOS_SEAFOOD.length * 100) + '%';
      }
    }

    // Mostrar resultados
    importProgress.style.display = 'none';
    importResults.style.display = 'block';
    document.getElementById('resultImported').textContent = imported;
    document.getElementById('resultDuplicates').textContent = duplicates;
    document.getElementById('resultErrors').textContent = errors;
    document.getElementById('resultTotal').textContent = PRESUPUESTOS_SEAFOOD.length;

    importBtn.textContent = 'Importación Completada';
    importBtn.disabled = true;

    // Recargar datos (force reload)
    pptoLoaded = false;
    await initPresupuestos();

  } catch (err) {
    console.error('Error en importación:', err);
    importStatus.innerHTML = `❌ Error: ${err.message}`;
    importProgressBar.style.background = '#ef4444';
  }
}
