// programación orientada a objetos POO
// aca va toda la logica de los datos
//const boom = require('@hapi/boom');

const { models } = require('./../libs-conection/sequelize');

class CategoryService {

  constructor() {
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id,{
      include: ['products']
  });
    return category;
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

module.exports = CategoryService;
