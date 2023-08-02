const { Model, DataTypes, Sequelize } = require('sequelize');

// tabla de clientes debido a que necesitamos para la relación 1 a m
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  // Idcustomer
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  // generar el total y datos calculados
  // es recomendable para numeros pequeños
  total: {
    // los datos no estaran en una tabla Y seran virtual
    type: DataTypes.VIRTUAL,
    // para especificar como obtener el campo = get()
    get() {
      // el name (item) debe ser igual a la de la sociación
      if (this.items.length > 0) {
        // reduce => reduce todo en un solo valor
        // este return es un for
        return this.items.reduce(
          (total, item) => {
            // cada ves que hay una iteración sumar
            return total + (item.price * item.OrderProduct.amount);
          }
          // inicia en 0
          , 0);
      }
      return 0;
    }
  }
}

class Order extends Model {

  static associate(models) {
    // 1 orden pertenece a m clientes
    this.belongsTo(models.Customer, {
      as: 'customer'
    });
    // M a M
    this.belongsToMany(models.Product, {
      // se asocia por items
      as: 'items',
      // llama a la tabla que tiene los Id de los padres => OrderProduct
      through: models.OrderProduct,
      // llave foranea de la entidad
      foreignKey: 'orderId',
      // otra llave foranea de la entidad producto
      otherKey: 'productId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
