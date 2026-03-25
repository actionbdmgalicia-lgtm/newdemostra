const { db } = require('../firebase-config');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { exhibitionId } = req.query;

    if (!exhibitionId) {
      return res.status(400).json({ error: 'exhibitionId es requerido' });
    }

    const snapshot = await db
      .collection('costs')
      .where('exhibitionId', '==', exhibitionId)
      .orderBy('createdAt', 'desc')
      .get();

    const costs = [];
    snapshot.forEach((doc) => {
      costs.push({ id: doc.id, ...doc.data() });
    });

    // Calcular totales
    let totalIngresos = 0;
    let totalGastos = 0;

    costs.forEach((cost) => {
      if (cost.type === 'INGRESO') {
        totalIngresos += cost.amount;
      } else {
        totalGastos += cost.amount;
      }
    });

    const margin = totalIngresos - totalGastos;
    const marginPercent = totalIngresos > 0 ? ((margin / totalIngresos) * 100).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      count: costs.length,
      costs,
      totals: {
        totalIngresos,
        totalGastos,
        margin,
        marginPercent,
      },
    });
  } catch (error) {
    console.error('Error al listar costes:', error);
    res.status(500).json({ error: error.message });
  }
}
