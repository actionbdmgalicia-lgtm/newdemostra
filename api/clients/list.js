const { db } = require('../firebase-config');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const snapshot = await db
      .collection('clients')
      .orderBy('name', 'asc')
      .get();

    const clients = [];
    snapshot.forEach((doc) => {
      clients.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({
      success: true,
      count: clients.length,
      clients,
    });
  } catch (error) {
    console.error('Error al listar clientes:', error);
    res.status(500).json({ error: error.message });
  }
}
