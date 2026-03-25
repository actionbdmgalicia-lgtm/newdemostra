const { db } = require('../firebase-config');

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { costId } = req.query;

    if (!costId) {
      return res.status(400).json({ error: 'costId es requerido' });
    }

    const costDoc = await db.collection('costs').doc(costId).get();
    if (!costDoc.exists) {
      return res.status(404).json({ error: 'Coste no encontrado' });
    }

    const costData = costDoc.data();
    const { exhibitionId, amount, type } = costData;

    // Eliminar el coste
    await db.collection('costs').doc(costId).delete();

    // Actualizar totales de la feria
    const exhibitionDoc = await db.collection('exhibitions').doc(exhibitionId).get();
    if (exhibitionDoc.exists) {
      const exData = exhibitionDoc.data();
      let totalSales = exData.totalSales || 0;
      let totalCosts = exData.totalCosts || 0;

      if (type === 'INGRESO') {
        totalSales -= amount;
      } else {
        totalCosts -= amount;
      }

      const margin = totalSales - totalCosts;

      await db.collection('exhibitions').doc(exhibitionId).update({
        totalSales,
        totalCosts,
        margin,
        updatedAt: new Date().toISOString(),
      });
    }

    res.status(200).json({
      success: true,
      message: 'Coste eliminado exitosamente',
    });
  } catch (error) {
    console.error('Error al eliminar coste:', error);
    res.status(500).json({ error: error.message });
  }
}
