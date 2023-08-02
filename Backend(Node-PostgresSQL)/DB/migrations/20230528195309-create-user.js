// crea una tabla de acuerdo a los valores
// configurados en DB/config.js

'use strict';
// trae el schema y el usuario de la tabla
const { UserSchema, USER_TABLE } = require('./../models/user.models');

module.exports = {
  // para la creación de migraciones
  up: async (queryInterface) => {
    //query interface trae una API para crear tabla
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  // para revertir cambios
  down: async (queryInterface) => {
    // eliminar la tabla
    await queryInterface.dropTable(USER_TABLE);
  }
};
