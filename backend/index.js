const express = require('express'); // Importar Express
const app = express();             // Crear una instancia de Express

// Configurar una ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Esto es un backend con Express.');
});

// Configurar el puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
