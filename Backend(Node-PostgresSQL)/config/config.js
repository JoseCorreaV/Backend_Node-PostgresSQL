// configuración base para leer variables de entorno

require('dotenv').config();

const config ={
  // => process - lo usa node para leer las varibles
  // Si no hay un NODE_Env  que pase a 'dev' con ||
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  // PARA LA BD
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT
}

module.exports = {config};
