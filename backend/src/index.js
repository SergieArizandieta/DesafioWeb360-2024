const express = require('express'); 
const app = express();            
const { server } = require("./config/config");
const cors = require("cors");
const cookies = require("cookie-parser");

app.use(cors({ origin: true, credentials: true }));
app.use(cookies());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Esto es un backend con Express.');
});

app.listen(server.port, () => {
  console.log(`Server running on port: ${server.port}`);
});