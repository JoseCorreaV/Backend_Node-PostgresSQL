//const boom = require('@hapi/boom');

const { models } = require('./../libs-conection/sequelize');

class OrderService {
  constructor() { }


  // create de orden de compras
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  // agregar item
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }


  async find() {
    return [];
  }

  async findOne(id) {
    // relación  1 a m
    const order = await models.Order.findByPk(id, {
      // mostrar la información detallada del cliente y usuario
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        "items"
      ]
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
