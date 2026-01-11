import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

router.post('/', async (req, res) => {
  const { cancion } = req.body;

  if (!cancion || !cancion.trim()) {
    return res.status(400).json({ message: 'Canción requerida' });
  }

  try {
    await pool.execute(
      'INSERT INTO canciones (cancion) VALUES (?)',
      [cancion]
    );

    res.status(201).json({ message: 'Canción registrada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar la canción' });
  }
});

router.get('/__listado_interno_xv_isa_2026', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM canciones ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener canciones' });
  }
});


export default router;
