const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

// squema para la estructura

// El esquema define las propiedades de los campos de la tabla user
const UserSchema = {
  id: {
    // para no permitir un campo nulo
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    //
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    // campo unico
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  // Para llamarlo en JavaScript
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    // para llamarlo a la BD
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
};

// el extends es para traer las funciones o query de model
// conexión a la tabla user
class User extends Model {
  // Static => no necesita declarar el objeto para ser utilizado en metodos
  static associate(models) {
    // tiene un cliente
    this.hasOne(models.Customer, {
      as: 'customer',
      // llave foranea
      foreignKey: 'userId'
    });
  }

  // para recibir la conexion
  static config(sequelize) {
    return {
      // conexión
      sequelize,
      // nombre de la tabla
      tableName: USER_TABLE,
      // nombre del modelo
      modelName: 'User',
      // crear campos por defectos
      timestamps: false
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
