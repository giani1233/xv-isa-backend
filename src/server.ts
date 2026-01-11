import app from './app.js';

const PORT = Number(process.env.PORT);

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor escuchando en puerto " + PORT);
});