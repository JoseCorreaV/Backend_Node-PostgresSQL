// mala practica devido a que estamos creando una
// dirección nueva
const  { Client } = require('pg');


// Conexión con postgres
async function getConnection(){

  const client = new Client({
    host: "localhost",
    port: 5432,
    user:"jose",
    password:"jose123",
    database:'MyStore'
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
