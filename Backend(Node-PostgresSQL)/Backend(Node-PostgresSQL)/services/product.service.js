// programación orientada a objetos POO
// aca va toda la logica de los datos
const { faker } = require('@faker-js/faker')
const { Op } = require('sequelize')
const boom = require('@hapi/boom');

// obtener productos de la base de datos
const { models } = require('../libs-conection/sequelize');

class productsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    // si no existe un valor de size por defecto limit = 10 pero si ingresamos
    /// /productos?size=1 => limit = 1
    const limit = 100;
    // agregar por defecto 10 productos utilizando faker y size
    for (let index = 0; index < limit; index++) {
      this.products.push({
        // generar un string id aleatorio
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        // para productos que no se deberian ver
        isBlock: faker.datatype.boolean(),
      });
    }
  }


  //---------------------------------------------------------
  async create(data) {
    const Newproducts = await models.Product.create(data);
    return Newproducts;
  }
  //------------------------------------------------------
  async find(query) {
    const options = {
      include: ['category'],
      // para validaciones
      // selected
      where: {}
    }
    //--------------- paginación  Dinamica ----------
    // obtener los valores limit y offset de query
    const { limit, offset } = query;
    // Si existe limit y offset
    if (limit && offset) {
      // agregar limit y offset a option
      // recibe solo 10 elementos
      options.limit = limit;
      // offset:0 => apuntador, inicia dede la 1 pagina o elemnto
      options.offset = offset;
    }

    // --------------- filtrar el producto por precios iguales ----------
    const { price } = query;
    if (price) {
      // guarda los precios iguales en option
      options.where.price = price;
    }

    // --------------- filtrar el producto por precios----------
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      // si existe el precio se modifica el where y se guarda en option
      // el prcio no es exacto
      options.where.price = {
       // para poder utilizar los operadores de node
         // >=  en sql
       [Op.gte]: price_min,
        // <=  en sql
       [Op.lte]: price_max
      };
    } // salida sql => SELECT *Product LEFT OUTER JOIN "categories" AS "category" ON "Product"."category_id" = "category"."id" WHERE ("Product"."price" >= '10' AND "Product"."price" <= '12');

    const products = await models.Product.findAll(options);
    return products;
  }


  //---------------------------------------------------------
  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    // regla del negocio
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }
  //---------------------------------------------------------
  async update(id, changes) {
    // encontrar la posición del con findIndex
    const index = this.products.findIndex(item => item.id === id);
    // si no encuentra el elemento normalmente envia un -1
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const produc = this.products[index];
    // en la posición del objeto aplicar los cambios y dejar los demas elementos
    this.products[index] = {
      ...produc,
      ...changes
    };
    return this.products[index];
  }
  //---------------------------------------------------------
  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    // enviar una posición para poder eliminarla .splice
    // y cuantos elementos deseo eliminar a partir de la posición
    this.products.splice(index, 1);
    // retorna el id eliminado
    return { id };
  }

}

module.exports = productsService;
