import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, TrendingUp, AlertCircle, Plus, Trash2, Eye, Edit2, Download } from 'lucide-react';

const ExhibitionBudgetApp = () => {
  // Colores DEMOSTRA (basado en paleta corporativa española)
  const colors = {
    primary: '#1e3a8a',      // Azul oscuro corporativo
    secondary: '#f97316',    // Naranja/rojo
    success: '#16a34a',      // Verde
    warning: '#ea580c',      // Naranja oscuro
    danger: '#dc2626',       // Rojo
    light: '#f8fafc',        // Blanco/gris claro
    border: '#e2e8f0',       // Gris claro
  };

  // Datos iniciales de ferias
  const [exhibitions, setExhibitions] = useState([
    { id: 1, name: 'HIP 2026', location: 'MD', client: 'FARM FRITS', year: 2026, budgetSale: 27000, budgetCost: 13500, stands: 1 },
    { id: 2, name: 'ALIMENTARIA', location: 'BCN', client: 'Client1', year: 2026, budgetSale: 20000, budgetCost: 7000, stands: 1 },
    { id: 3, name: 'SEAFOOD BCN', location: 'BCN', client: 'Client2', year: 2026, budgetSale: 315000, budgetCost: 160891, stands: 7 },
    { id: 4, name: 'NAVALIA', location: 'Local', client: 'Client3', year: 2026, budgetSale: 120000, budgetCost: 54415, stands: 8 },
    { id: 5, name: 'MARMOMAC', location: 'INT', client: 'Client4', year: 2026, budgetSale: 60000, budgetCost: 34412, stands: 2 },
    { id: 6, name: 'SMART CITY', location: 'BCN', client: 'Client5', year: 2026, budgetSale: 135000, budgetCost: 63644, stands: 3 },
  ]);

  const [costs, setCosts] = useState([
    { id: 1, exhibitionId: 1, category: 'CARPINTERIA', realCost: -1700, ptoType: 'GASTO', date: '2026-03-10' },
    { id: 2, exhibitionId: 1, category: 'ELECTRICIDAD', realCost: -1860, ptoType: 'GASTO', date: '2026-03-10' },
    { id: 3, exhibitionId: 1, category: 'GASTOS VIAJE', realCost: -1300, ptoType: 'GASTO', date: '2026-03-10' },
    { id: 4, exhibitionId: 2, category: 'CARPINTERIA', realCost: -2500, ptoType: 'GASTO', date: '2026-03-12' },
    { id: 5, exhibitionId: 3, category: 'MONTAJE', realCost: -45000, ptoType: 'GASTO', date: '2026-03-15' },
    { id: 6, exhibitionId: 3, category: 'ELECTRICIDAD', realCost: -22000, ptoType: 'GASTO', date: '2026-03-15' },
    { id: 7, exhibitionId: 3, category: 'GRAFICA', realCost: -18500, ptoType: 'GASTO', date: '2026-03-16' },
  ]);

  const [selectedExhibition, setSelectedExhibition] = useState(1);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewExhibition, setShowNewExhibition] = useState(false);
  const [showNewCost, setShowNewCost] = useState(false);
  const [filters, setFilters] = useState({ exhibitionName: '', client: '' });

  const categories = ['CARPINTERIA', 'MONTAJE', 'ELECTRICIDAD', 'GASTOS VIAJE', 'GRAFICA', 'MATERIAL', 'TRANSPORTE', 'SERVICIOS FERIALES', 'OTROS'];

  // Cálculos
  const calculateGastoGG = (baseCost) => Math.abs(baseCost) * 0.07;
  const calculateImprevistos = (baseCost) => Math.abs(baseCost) * 0.03;

  const exhibitionsByFilter = useMemo(() => {
    return exhibitions.filter(e => {
      const nameMatch = !filters.exhibitionName || e.name.toLowerCase().includes(filters.exhibitionName.toLowerCase());
      const clientMatch = !filters.client || e.client.toLowerCase().includes(filters.client.toLowerCase());
      return nameMatch && clientMatch;
    });
  }, [exhibitions, filters]);

  const currentExhibition = exhibitions.find(e => e.id === selectedExhibition);
  const exhibitionCosts = costs.filter(c => c.exhibitionId === selectedExhibition);

  // Calcular totales por categoría
  const costsByCategory = useMemo(() => {
    const categoryMap = {};
    categories.forEach(cat => {
      const realCosts = exhibitionCosts
        .filter(c => c.category === cat)
        .reduce((sum, c) => sum + c.realCost, 0);

      categoryMap[cat] = {
        name: cat,
        real: realCosts,
        budget: realCosts ? Math.abs(realCosts) / 0.9 : 0, // Estimado
      };
    });
    return Object.values(categoryMap).filter(c => c.real !== 0);
  }, [exhibitionCosts, categories]);

  // Totales
  const totalRealCosts = exhibitionCosts.reduce((sum, c) => sum + c.realCost, 0);
  const gastoGG = calculateGastoGG(totalRealCosts);
  const imprevistos = calculateImprevistos(totalRealCosts);
  const totalCostsWithAdditional = totalRealCosts - gastoGG - imprevistos;

  const budgetMargin = currentExhibition ? currentExhibition.budgetSale - currentExhibition.budgetCost : 0;
  const realMargin = currentExhibition ? currentExhibition.budgetSale + totalCostsWithAdditional : 0;
  const marginDeviation = realMargin - budgetMargin;
  const marginDeviationPercent = budgetMargin ? (marginDeviation / budgetMargin * 100) : 0;

  // Dashboard totales (todas las ferias)
  const dashboardTotals = useMemo(() => {
    const filtered = exhibitionsByFilter.length > 0 ? exhibitionsByFilter : exhibitions;
    const totalSales = filtered.reduce((sum, e) => sum + e.budgetSale, 0);
    const totalBudgetCosts = filtered.reduce((sum, e) => sum + e.budgetCost, 0);
    const totalRealCosts = costs
      .filter(c => filtered.some(e => e.id === c.exhibitionId))
      .reduce((sum, c) => sum + c.realCost, 0);
    const totalGG = calculateGastoGG(totalRealCosts);
    const totalImprevistos = calculateImprevistos(totalRealCosts);
    const budgetMargin = totalSales - totalBudgetCosts;
    const realMargin = totalSales + totalRealCosts - totalGG - totalImprevistos;

    return {
      sales: totalSales,
      budgetCosts: totalBudgetCosts,
      realCosts: totalRealCosts + totalGG + totalImprevistos,
      budgetMargin: budgetMargin,
      realMargin: realMargin,
      marginPercent: totalSales > 0 ? (realMargin / totalSales * 100) : 0,
      budgetMarginPercent: totalSales > 0 ? (budgetMargin / totalSales * 100) : 0,
    };
  }, [exhibitions, exhibitionsByFilter, costs]);

  // Datos para gráfico de desviaciones
  const deviationChartData = useMemo(() => {
    return costsByCategory.map(cat => ({
      category: cat.name,
      Real: Math.abs(cat.real),
      Presupuesto: Math.abs(cat.budget),
    }));
  }, [costsByCategory]);

  // Handlers
  const addExhibition = (name, client, year, budgetSale, budgetCost, location, stands) => {
    const newExhibition = {
      id: Math.max(...exhibitions.map(e => e.id), 0) + 1,
      name, client, year, budgetSale, budgetCost, location, stands
    };
    setExhibitions([...exhibitions, newExhibition]);
    setShowNewExhibition(false);
  };

  const addCost = (exhibitionId, category, realCost, ptoType) => {
    const newCost = {
      id: Math.max(...costs.map(c => c.id), 0) + 1,
      exhibitionId,
      category,
      realCost: parseFloat(realCost),
      ptoType,
      date: new Date().toISOString().split('T')[0]
    };
    setCosts([...costs, newCost]);
    setShowNewCost(false);
  };

  const deleteCost = (id) => {
    setCosts(costs.filter(c => c.id !== id));
  };

  const deleteExhibition = (id) => {
    setExhibitions(exhibitions.filter(e => e.id !== id));
    setCosts(costs.filter(c => c.exhibitionId !== id));
    if (selectedExhibition === id) setSelectedExhibition(exhibitions[0]?.id);
  };

  // Componentes
  const StatCard = ({ label, value, icon: Icon, color, subtext }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4" style={{ borderColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold mt-2">{typeof value === 'number' ? `€${value.toLocaleString('es-ES', { maximumFractionDigits: 0 })}` : value}</p>
          {subtext && <p className="text-xs mt-1" style={{ color }}>{subtext}</p>}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: color + '20' }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  const FormModal = ({ title, onClose, onSubmit, children }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );

  // Tabs
  const Tab = ({ name, label, isActive }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`px-4 py-2 font-medium border-b-2 transition ${
        isActive
          ? `border-[${colors.primary}] text-[${colors.primary}]`
          : 'border-transparent text-gray-600 hover:text-gray-800'
      }`}
      style={{
        borderColor: isActive ? colors.primary : 'transparent',
        color: isActive ? colors.primary : '#4b5563'
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ backgroundColor: colors.light }} className="min-h-screen">
      {/* Header */}
      <div style={{ backgroundColor: colors.primary }} className="text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3">
            <DollarSign size={32} />
            <h1 className="text-3xl font-bold">DEMOSTRA - Gestor de Ferias</h1>
          </div>
          <p className="text-blue-100 mt-2">Seguimiento de presupuestos y costes en tiempo real</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 flex gap-8">
          <Tab name="dashboard" label="📊 Dashboard" isActive={activeTab === 'dashboard'} />
          <Tab name="exhibitions" label="🎪 Ferias" isActive={activeTab === 'exhibitions'} />
          <Tab name="costs" label="💰 Costes" isActive={activeTab === 'costs'} />
          <Tab name="analysis" label="📈 Análisis" isActive={activeTab === 'analysis'} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Filtrar por feria..."
                value={filters.exhibitionName}
                onChange={(e) => setFilters({ ...filters, exhibitionName: e.target.value })}
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Filtrar por cliente..."
                value={filters.client}
                onChange={(e) => setFilters({ ...filters, client: e.target.value })}
                className="flex-1 px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <StatCard
                label="Facturación Total"
                value={dashboardTotals.sales}
                icon={DollarSign}
                color={colors.primary}
              />
              <StatCard
                label="Gastos Previstos"
                value={dashboardTotals.budgetCosts}
                icon={AlertCircle}
                color={colors.warning}
              />
              <StatCard
                label="Gastos Reales"
                value={dashboardTotals.realCosts}
                icon={TrendingUp}
                color={colors.danger}
              />
              <StatCard
                label="Margen Ppto"
                value={dashboardTotals.budgetMargin}
                icon={TrendingUp}
                color={colors.success}
                subtext={`${dashboardTotals.budgetMarginPercent.toFixed(1)}%`}
              />
              <StatCard
                label="Margen Real"
                value={dashboardTotals.realMargin}
                icon={TrendingUp}
                color={marginDeviationPercent < 0 ? colors.danger : colors.success}
                subtext={`${dashboardTotals.marginPercent.toFixed(1)}%`}
              />
            </div>

            {/* Resumen de ferias */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Resumen por Feria</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${colors.primary}` }}>
                      <th className="text-left py-3 px-2 font-bold">Feria</th>
                      <th className="text-left py-3 px-2 font-bold">Cliente</th>
                      <th className="text-right py-3 px-2 font-bold">Stands</th>
                      <th className="text-right py-3 px-2 font-bold">Venta</th>
                      <th className="text-right py-3 px-2 font-bold">Ppto</th>
                      <th className="text-right py-3 px-2 font-bold">Real</th>
                      <th className="text-right py-3 px-2 font-bold">Margen %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exhibitionsByFilter.map((ex) => {
                      const exCosts = costs.filter(c => c.exhibitionId === ex.id).reduce((sum, c) => sum + c.realCost, 0);
                      const exGG = calculateGastoGG(exCosts);
                      const exImprevistos = calculateImprevistos(exCosts);
                      const realMargin = ex.budgetSale + exCosts - exGG - exImprevistos;
                      const marginPercent = ex.budgetSale > 0 ? (realMargin / ex.budgetSale * 100) : 0;
                      const marginOK = marginPercent >= 40;

                      return (
                        <tr key={ex.id} className="border-b hover:bg-blue-50">
                          <td className="py-3 px-2 font-semibold">{ex.name}</td>
                          <td className="py-3 px-2">{ex.client}</td>
                          <td className="py-3 px-2 text-right">{ex.stands}</td>
                          <td className="py-3 px-2 text-right">€{ex.budgetSale.toLocaleString('es-ES', { maximumFractionDigits: 0 })}</td>
                          <td className="py-3 px-2 text-right">€{ex.budgetCost.toLocaleString('es-ES', { maximumFractionDigits: 0 })}</td>
                          <td className="py-3 px-2 text-right" style={{ color: exCosts > ex.budgetCost ? colors.danger : colors.success }}>
                            €{Math.abs(exCosts).toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                          </td>
                          <td className="py-3 px-2 text-right font-bold" style={{ color: marginOK ? colors.success : colors.danger }}>
                            {marginPercent.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* FERIAS */}
        {activeTab === 'exhibitions' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestión de Ferias</h2>
              <button
                onClick={() => setShowNewExhibition(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold"
                style={{ backgroundColor: colors.secondary }}
              >
                <Plus size={20} /> Nueva Feria
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exhibitions.map((ex) => (
                <div key={ex.id} className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: colors.primary }}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{ex.name}</h3>
                      <p className="text-sm text-gray-600">{ex.client}</p>
                    </div>
                    <button
                      onClick={() => deleteExhibition(ex.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ubicación:</span>
                      <span className="font-semibold">{ex.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stands:</span>
                      <span className="font-semibold">{ex.stands}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Año:</span>
                      <span className="font-semibold">{ex.year}</span>
                    </div>
                    <div className="flex justify-between" style={{ color: colors.primary }}>
                      <span>Venta Ppto:</span>
                      <span className="font-bold">€{ex.budgetSale.toLocaleString('es-ES')}</span>
                    </div>
                    <div className="flex justify-between" style={{ color: colors.warning }}>
                      <span>Coste Ppto:</span>
                      <span className="font-bold">€{ex.budgetCost.toLocaleString('es-ES')}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedExhibition(ex.id);
                      setActiveTab('costs');
                    }}
                    className="w-full px-4 py-2 rounded-lg font-semibold text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Ver Costes
                  </button>
                </div>
              ))}
            </div>

            {showNewExhibition && (
              <NewExhibitionForm
                onClose={() => setShowNewExhibition(false)}
                onSubmit={addExhibition}
              />
            )}
          </div>
        )}

        {/* COSTES */}
        {activeTab === 'costs' && currentExhibition && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">{currentExhibition.name}</h2>
                <p className="text-gray-600">{currentExhibition.client}</p>
              </div>
              <button
                onClick={() => setShowNewCost(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold"
                style={{ backgroundColor: colors.secondary }}
              >
                <Plus size={20} /> Nuevo Coste
              </button>
            </div>

            {/* Seleccionar feria */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Seleccionar Feria:</label>
              <select
                value={selectedExhibition}
                onChange={(e) => setSelectedExhibition(parseInt(e.target.value))}
                className="w-full md:w-64 px-4 py-2 border rounded-lg"
              >
                {exhibitions.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.name} - {ex.client}</option>
                ))}
              </select>
            </div>

            {/* Resumen de costes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                label="Venta Ppto"
                value={currentExhibition.budgetSale}
                icon={DollarSign}
                color={colors.primary}
              />
              <StatCard
                label="Coste Total"
                value={Math.abs(totalCostsWithAdditional)}
                icon={AlertCircle}
                color={colors.danger}
                subtext={`GG: €${gastoGG.toFixed(0)}, Imprevistos: €${imprevistos.toFixed(0)}`}
              />
              <StatCard
                label="Margen Ppto"
                value={budgetMargin}
                icon={TrendingUp}
                color={colors.success}
                subtext={`${(budgetMargin / currentExhibition.budgetSale * 100).toFixed(1)}%`}
              />
              <StatCard
                label="Margen Real"
                value={realMargin}
                icon={TrendingUp}
                color={marginDeviationPercent < 0 ? colors.danger : colors.success}
                subtext={`${(realMargin / currentExhibition.budgetSale * 100).toFixed(1)}% ${marginDeviationPercent > 0 ? '+' : ''}${marginDeviationPercent.toFixed(1)}%`}
              />
            </div>

            {/* Tabla de costes */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Detalle de Costes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${colors.primary}` }}>
                      <th className="text-left py-3 px-2 font-bold">Categoría</th>
                      <th className="text-left py-3 px-2 font-bold">Tipo</th>
                      <th className="text-right py-3 px-2 font-bold">Importe</th>
                      <th className="text-left py-3 px-2 font-bold">Fecha</th>
                      <th className="text-center py-3 px-2 font-bold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exhibitionCosts.map((cost) => (
                      <tr key={cost.id} className="border-b hover:bg-blue-50">
                        <td className="py-3 px-2 font-semibold">{cost.category}</td>
                        <td className="py-3 px-2">{cost.ptoType}</td>
                        <td className="py-3 px-2 text-right font-semibold" style={{ color: colors.danger }}>
                          €{Math.abs(cost.realCost).toLocaleString('es-ES')}
                        </td>
                        <td className="py-3 px-2">{cost.date}</td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => deleteCost(cost.id)}
                            className="text-red-500 hover:bg-red-50 p-1 rounded inline"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: colors.light, borderTop: `2px solid ${colors.primary}` }}>
                      <td colSpan="2" className="py-3 px-2 font-bold">Total Costes</td>
                      <td className="py-3 px-2 text-right font-bold" style={{ color: colors.danger }}>
                        €{Math.abs(totalRealCosts).toLocaleString('es-ES')}
                      </td>
                      <td colSpan="2"></td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="py-2 px-2 text-sm">Gastos GG (7%)</td>
                      <td className="py-2 px-2 text-right text-sm font-semibold">-€{gastoGG.toFixed(0)}</td>
                      <td colSpan="2"></td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="py-2 px-2 text-sm">Imprevistos (3%)</td>
                      <td className="py-2 px-2 text-right text-sm font-semibold">-€{imprevistos.toFixed(0)}</td>
                      <td colSpan="2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {showNewCost && (
              <NewCostForm
                categories={categories}
                exhibitionId={selectedExhibition}
                onClose={() => setShowNewCost(false)}
                onSubmit={addCost}
              />
            )}
          </div>
        )}

        {/* ANÁLISIS */}
        {activeTab === 'analysis' && currentExhibition && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{currentExhibition.name} - Análisis de Desviaciones</h2>

            {/* Gráfico de barras comparativo */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">Comparativa: Presupuestado vs Real</h3>
              {deviationChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={deviationChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Presupuesto" fill={colors.primary} />
                    <Bar dataKey="Real" fill={colors.danger} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-600">Sin datos de costes para esta feria</p>
              )}
            </div>

            {/* Análisis por categoría */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Análisis por Categoría</h3>
              <div className="space-y-3">
                {costsByCategory.map((cat) => {
                  const deviation = cat.real - cat.budget;
                  const deviationPercent = cat.budget > 0 ? (deviation / cat.budget * 100) : 0;
                  const overBudget = deviation > 0;

                  return (
                    <div key={cat.name} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{cat.name}</span>
                        <span
                          className="font-bold px-3 py-1 rounded"
                          style={{
                            backgroundColor: overBudget ? colors.danger + '20' : colors.success + '20',
                            color: overBudget ? colors.danger : colors.success
                          }}
                        >
                          {overBudget ? '+' : ''}{deviationPercent.toFixed(1)}%
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Presupuesto</p>
                          <p className="font-bold">€{Math.abs(cat.budget).toLocaleString('es-ES')}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Real</p>
                          <p className="font-bold">€{Math.abs(cat.real).toLocaleString('es-ES')}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Desviación</p>
                          <p className="font-bold" style={{ color: overBudget ? colors.danger : colors.success }}>
                            €{Math.abs(deviation).toLocaleString('es-ES')}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componentes de formularios
const NewExhibitionForm = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '', client: '', year: 2026, budgetSale: '', budgetCost: '', location: '', stands: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form.name, form.client, form.year, parseFloat(form.budgetSale), parseFloat(form.budgetCost), form.location, parseInt(form.stands));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Nueva Feria</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Nombre" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          <input type="text" placeholder="Cliente" value={form.client} onChange={(e) => setForm({...form, client: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          <input type="text" placeholder="Ubicación" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          <input type="number" placeholder="Stands" value={form.stands} onChange={(e) => setForm({...form, stands: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          <input type="number" placeholder="Venta Ppto" value={form.budgetSale} onChange={(e) => setForm({...form, budgetSale: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          <input type="number" placeholder="Coste Ppto" value={form.budgetCost} onChange={(e) => setForm({...form, budgetCost: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          <div className="flex gap-2 pt-4">
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">Crear</button>
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-300 rounded font-semibold hover:bg-gray-400">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const NewCostForm = ({ categories, exhibitionId, onClose, onSubmit }) => {
  const [form, setForm] = useState({ category: categories[0], realCost: '', ptoType: 'GASTO' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(exhibitionId, form.category, -Math.abs(parseFloat(form.realCost)), form.ptoType);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Nuevo Coste</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full px-3 py-2 border rounded">
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="number" placeholder="Importe (€)" value={form.realCost} onChange={(e) => setForm({...form, realCost: e.target.value})} className="w-full px-3 py-2 border rounded" required />
          <select value={form.ptoType} onChange={(e) => setForm({...form, ptoType: e.target.value})} className="w-full px-3 py-2 border rounded">
            <option value="GASTO">Gasto</option>
            <option value="VENTAS">Venta</option>
          </select>
          <div className="flex gap-2 pt-4">
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">Añadir</button>
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-300 rounded font-semibold hover:bg-gray-400">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExhibitionBudgetApp;
