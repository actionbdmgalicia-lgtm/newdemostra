const { db } = require('../firebase-config');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { year } = req.query;

    let query = db.collection('exhibitions');

    if (year) {
      query = query.where('year', '==', parseInt(year));
    }

    const snapshot = await query.orderBy('createdAt', 'desc').get();

    const exhibitions = [];
    snapshot.forEach((doc) => {
      exhibitions.push(doc.data());
    });

    res.status(200).json({
      success: true,
      count: exhibitions.length,
      exhibitions,
    });
  } catch (error) {
    console.error('Error al listar ferias:', error);
    res.status(500).json({ error: error.message });
  }
}
