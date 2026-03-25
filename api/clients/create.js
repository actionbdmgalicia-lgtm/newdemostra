const { db } = require('../firebase-config');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre del cliente es requerido' });
    }

    // Verificar si el cliente ya existe
    const snapshot = await db
      .collection('clients')
      .where('name', '==', name)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      return res.status(200).json({
        success: true,
        message: 'Cliente ya existe',
        client: { id: snapshot.docs[0].id, ...snapshot.docs[0].data() },
      });
    }

    // Crear nuevo cliente
    const clientRef = await db.collection('clients').add({
      name,
      createdAt: new Date().toISOString(),
    });

    const clientData = await clientRef.get();

    res.status(201).json({
      success: true,
      message: 'Cliente creado exitosamente',
      client: { id: clientRef.id, ...clientData.data() },
    });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: error.message });
  }
}
