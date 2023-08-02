const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  // config ambientes
  development: {
    url: URI,
    dialect: 'postgres',
  },
  // config producción
  production: {
    url: URI,
    dialect: 'postgres',
  }
}
