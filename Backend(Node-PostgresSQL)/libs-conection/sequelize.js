// este sequelize o ORM es igual al CRUD
const {Sequelize} = require('sequelize');

const {config} = require('./../config/config');
// llamamos la función directamente por que esta en el
// index
const setupModels = require('./../DB/models');


// función encodeURIComponent - para leer datos criticos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// Url de conection - aqui puedo poner la url de conecction
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  // indicar que BD se está usando
   dialect: 'postgres',

  // dialect: 'mysql',

  // para mostrar en consola lo que se hace en la consulta
  // logging: console.log
});

setupModels(sequelize);


module.exports = sequelize;
