'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user.models');


module.exports = {
  up: async (queryInterface) => {
    // agregar columna rol a la tabla user
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
