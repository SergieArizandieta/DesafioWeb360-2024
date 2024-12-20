const dotenv = require("dotenv");
dotenv.config();
const { server } = require("./config/config");
const connectToDatabase = require("./data/dbConnection");


const express = require('express'); 
const app = express();            
const cors = require("cors");
const cookies = require("cookie-parser");

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookies());

async function initializeDatabase() {
  try {
      await connectToDatabase();
  } catch (err) {
      console.error('Error al conectar con la base de datos:', err);
      process.exit(1);
  }
}


app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Esto es un backend con Express.');
});

const authRoutes = require("./routes/authRouter");
app.use(authRoutes);

initializeDatabase().then(() => {
  app.listen(server.port, () => {
      console.log(`Servidor corriendo en http://localhost:${server.port}`);
  });
});