const dotenv = require("dotenv");
dotenv.config();
const { server } = require("./config/config");
const connectToDatabase = require("./data/dbConnection");
const initModels = require("./types/index");
const routers = require("./routes/index");

const express = require('express'); 
const app = express();            
const cors = require("cors");
const cookies = require("cookie-parser");

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookies());

app.use("/auth", routers.auth);
app.use("/product", routers.product);
app.use("/category", routers.category);

async function initializeDatabase() {
  try {
      await connectToDatabase();
      await initModels.auth();
      await initModels.product();
      await initModels.category();
  } catch (err) {
      console.error('Error al conectar con la base de datos:', err);
      process.exit(1);
  }
}

app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Esto es un backend con Express.');
});


initializeDatabase().then(() => {
  app.listen(server.port, () => {
      console.log(`Servidor corriendo en http://localhost:${server.port}`);
  });
});