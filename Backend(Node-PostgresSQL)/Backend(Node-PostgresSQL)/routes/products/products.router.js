// Modulo para los productos
const express = require('express');

const productsService = require('../../services/product.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { createSchemaProduct, updateSchemaProduct, getSchemaProduct, queryProductSchema} = require('../../schemas_DTO/product.schema');


const router = express.Router();
const services = new productsService();

/* -------------------------GET------------------------ */
// Ruta productos
router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      //req.query => enviar todo lo que venga del query
      const products = await services.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

/* ----------------------Ruta que recibe parametros--------------------------- */
/*Primero especifica y luego dinamica para que
las rutas no sean afectadas */

// dimamica
// Tiene como ruta prducto/Id "Cualquier Numero"
router.get('/:Id',
  // validar el producto con ela información en el body
  validatorHandler(getSchemaProduct, 'body'),
  async (req, res, next) => {
    try {
      // una constante que trae solo la id de la ruta
      const { Id } = req.params;
      const product = await services.findOne(Id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

/* ----------------------POST-------------------------- */
// crea
router.post('/',
  // validar el producto con el parametro enviado
  validatorHandler(createSchemaProduct, 'body'),
  async (req, res, next) => {
    try {
      // para recibir los parametros que llegan de thunder client
      const body = req.body;
      const newProducto = await services.create(body);
      res.status(201).json(newProducto);
    } catch (error) {
      next(error);
    }
  });

/* ----------------------PATCH------------------------- */
// actualizar parcialmente los elementos
router.patch('/:id',
  validatorHandler(getSchemaProduct, 'params'),
  validatorHandler(updateSchemaProduct, 'body'),
  async (req, res, next) => {
    // si todo esta bien
    try {
      //Recibir id que esta en los parametros
      const { id } = req.params;
      // para recibir los parametros que llegan de thunder client
      const body = req.body;
      const product = await services.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }

  });


/* ----------------------DELETE------------------------- */
//Eliminar los elementos
router.delete('/:id',
  validatorHandler(getSchemaProduct, 'params'),
  async (req, res, next) => {
    try {
      //Recibir id que esta en los parametros
      const { id } = req.params;
      await services.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);


// para que el modelo sea exportable
module.exports = router;
