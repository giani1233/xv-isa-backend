import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.post('/', async (req, res) => {
  const { personas } = req.body;

  if (!Array.isArray(personas) || personas.length === 0) {
    return res.status(400).json({ message: 'Debe enviar al menos una persona' });
  }

  try {
    // Crear RSVP
    const [rsvpResult]: any = await pool.execute('INSERT INTO rsvp () VALUES ()');
    const rsvpId = rsvpResult.insertId;

    // Insertar personas
    const insertPromises = personas.map(p => {
      if (!p.nombre || !p.apellido) {
        throw new Error('Cada persona debe tener nombre y apellido');
      }
      return pool.execute(
        'INSERT INTO personas (rsvp_id, nombre, apellido, requerimientos) VALUES (?, ?, ?, ?)',
        [rsvpId, p.nombre, p.apellido, p.requerimientos ?? null]
      );
    });

    await Promise.all(insertPromises);

    res.status(201).json({ message: 'Confirmación recibida', rsvpId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar la confirmación', error: (error as Error).message });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT r.id AS rsvp_id, p.nombre, p.apellido, p.requerimientos
      FROM rsvp r
      JOIN personas p ON r.id = p.rsvp_id
      ORDER BY r.id ASC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las confirmaciones' });
  }
});

export default router;
