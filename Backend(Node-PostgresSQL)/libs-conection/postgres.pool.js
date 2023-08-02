// Buena practica
// reutiliza el pooling y no crea ruta por consulta
const  { Pool} = require('pg');

const {config} = require('./../config/config');

// función encodeURIComponent - para leer datos criticos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// Url de conection - aqui puedo poner la url de conecction
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


// Conexión buenas practicas
  const pool = new Pool({
    connectionString: URI
  });


module.exports = pool;
