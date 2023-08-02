// para configurar las rutas*
const express = require('express');
// llamar los routing de los productos
const productsRouter = require('./products/products.router');
const categoriesRouter = require('./categories/categories.router');
const userSRouter = require('./users/users.router');
 const orderRouter = require('./orders/orders.router');
const customersRouter = require('./customers/customers.router');

// para resivir la aplicación
function routerApi(app) {

  // primera forma de router por versiones: /apí/v1/products = aplicarlo a cada ruta
  // segunda forma de router por versiones
   const router = express.Router();
   app.use('/api/v1', router)

  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', userSRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customersRouter);
}

// Exportar la function routerApi
module.exports = routerApi;
