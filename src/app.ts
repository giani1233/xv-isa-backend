import express from 'express';
import cors from 'cors';
import rsvpRoutes from './routes/confirmaciones.routes.js';
import cancionesRouter from './routes/canciones.routes.js';

const app = express();

/* Middlewares base */
app.use(cors());
app.use(express.json());

/* Rutas */
app.use('/rsvp', rsvpRoutes);
app.use('/canciones', cancionesRouter);

/* Health check */
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
