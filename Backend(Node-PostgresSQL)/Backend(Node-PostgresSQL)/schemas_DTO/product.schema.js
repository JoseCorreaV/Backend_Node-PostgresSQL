// validar la data que envian desde el cliente

const Joi = require('joi');

// se crean los datos de la tabla producto + se agregan los limitantes
const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
//-------------------- paginación -----------------------------
const limit = Joi.number().integer();
const offset = Joi.number().integer();

// ---------------------- filtrar productos por rango -------------------
const price_min = Joi.number().integer()
const price_max = Joi.number().integer()


const createSchemaProduct = Joi.object({
  // añadir si es requerido o no el campo con => .requiered()
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required()
});

const updateSchemaProduct = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId
});

// validad si es correcto el id para hacer las validaciones de la BD
const getSchemaProduct = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  // se necesita para filtro de precios
  price,
  // se necesita para filtros min y max
  price_min,
  // price_max: price_min.when('price_min', { => max sera obligatorio si existe min
  price_max: price_min.when('price_min', {
   // si el minino es un numero entero
    is:Joi.number().integer(),
    // entonces el maximo sera requerido
    then: Joi.required()
  })
});

module.exports = { createSchemaProduct, updateSchemaProduct, getSchemaProduct, queryProductSchema};
