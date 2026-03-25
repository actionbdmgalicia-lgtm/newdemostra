const { db } = require('../firebase-config');

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { costId } = req.query;
    const { status, amount, type } = req.body;

    if (!costId) {
      return res.status(400).json({ error: 'costId es requerido' });
    }

    const costDoc = await db.collection('costs').doc(costId).get();
    if (!costDoc.exists) {
      return res.status(404).json({ error: 'Coste no encontrado' });
    }

    const costData = costDoc.data();
    const oldAmount = costData.amount;
    const oldType = costData.type;

    const updateData = {
      updatedAt: new Date().toISOString(),
    };

    if (status) updateData.status = status;
    if (amount !== undefined) updateData.amount = parseFloat(amount);
    if (type) updateData.type = type;

    await db.collection('costs').doc(costId).update(updateData);

    // Si cambió el monto o tipo, actualizar totales de la feria
    if (amount !== undefined || type) {
      const exhibitionDoc = await db
        .collection('exhibitions')
        .doc(costData.exhibitionId)
        .get();

      if (exhibitionDoc.exists) {
        const exData = exhibitionDoc.data();
        let totalSales = exData.totalSales || 0;
        let totalCosts = exData.totalCosts || 0;

        // Restar el valor anterior
        if (oldType === 'INGRESO') {
          totalSales -= oldAmount;
        } else {
          totalCosts -= oldAmount;
        }

        // Sumar el nuevo valor
        const newAmount = amount !== undefined ? parseFloat(amount) : oldAmount;
        const newType = type || oldType;

        if (newType === 'INGRESO') {
          totalSales += newAmount;
        } else {
          totalCosts += newAmount;
        }

        const margin = totalSales - totalCosts;

        await db.collection('exhibitions').doc(costData.exhibitionId).update({
          totalSales,
          totalCosts,
          margin,
          updatedAt: new Date().toISOString(),
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Coste actualizado exitosamente',
    });
  } catch (error) {
    console.error('Error al actualizar coste:', error);
    res.status(500).json({ error: error.message });
  }
}
