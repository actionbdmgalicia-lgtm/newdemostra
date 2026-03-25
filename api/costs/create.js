const { db } = require('../firebase-config');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const {
      exhibitionId,
      description,
      provider,
      amount,
      type, // 'INGRESO' o 'GASTO'
      category,
      status, // 'PAGADO', 'COBRADO', 'ENTREGADO', 'FACTURADO', 'PEDIDO', 'PENDIENTE'
    } = req.body;

    if (!exhibitionId || !description || !amount || !type || !status) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Validar que la feria existe
    const exhibitionDoc = await db.collection('exhibitions').doc(exhibitionId).get();
    if (!exhibitionDoc.exists) {
      return res.status(404).json({ error: 'Feria no encontrada' });
    }

    const newCost = {
      exhibitionId,
      description,
      provider: provider || 'N/A',
      amount: parseFloat(amount),
      type,
      category: category || 'GENERAL',
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const costRef = await db.collection('costs').add(newCost);

    // Actualizar totales de la feria
    const exhibitionData = exhibitionDoc.data();
    let totalSales = exhibitionData.totalSales || 0;
    let totalCosts = exhibitionData.totalCosts || 0;

    if (type === 'INGRESO') {
      totalSales += parseFloat(amount);
    } else {
      totalCosts += parseFloat(amount);
    }

    const margin = totalSales - totalCosts;

    await db.collection('exhibitions').doc(exhibitionId).update({
      totalSales,
      totalCosts,
      margin,
      updatedAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: 'Coste/Venta registrada exitosamente',
      cost: { id: costRef.id, ...newCost },
    });
  } catch (error) {
    console.error('Error al crear coste:', error);
    res.status(500).json({ error: error.message });
  }
}
