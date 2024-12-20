const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, 
  database: process.env.DB_DATABASE, 
  options: {
      encrypt: true,
      trustServerCertificate: true,
  },
  port: 1433 
};

module.exports = dbConfig;
