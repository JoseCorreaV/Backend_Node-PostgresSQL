const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.models');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  // el ID de la tabla user
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    // un objeto que va relacionado a la tabla user
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    // reglas para las relaciones
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

// en esta tabla esta la llave foranea
class Customer extends Model {

  static associate(models) {
    // 1 cliente pertenece a 1 cliente => 1 a 1
    this.belongsTo(models.User, {as: 'user'});
    // 1 cliente tiene m ordenes => 1 a M
    this.hasMany(models.Order, {
      as: 'orders',
    // llave foranea
    foreignKey: 'customerId'
  });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
