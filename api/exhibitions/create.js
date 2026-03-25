const { db } = require('../firebase-config');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { name, client, date, year } = req.body;

    if (!name || !client || !date) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Generar ID automático: "Feria-2026-001"
    const snapshot = await db
      .collection('exhibitions')
      .where('year', '==', parseInt(year))
      .get();

    const nextNumber = snapshot.size + 1;
    const exhibitionId = `Feria-${year}-${String(nextNumber).padStart(3, '0')}`;

    const newExhibition = {
      id: exhibitionId,
      name,
      client,
      date,
      year: parseInt(year),
      createdAt: new Date().toISOString(),
      status: 'active',
      totalSales: 0,
      totalCosts: 0,
      margin: 0,
    };

    await db.collection('exhibitions').doc(exhibitionId).set(newExhibition);

    res.status(201).json({
      success: true,
      message: 'Feria creada exitosamente',
      exhibition: newExhibition,
    });
  } catch (error) {
    console.error('Error al crear feria:', error);
    res.status(500).json({ error: error.message });
  }
}
