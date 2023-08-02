const boom = require('@hapi/boom');

// middelware dinamico
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    // {error} para recibir el error como una propiedad
    // para mostrar todos los errores de una vez => , {abortEarly: false})
    const { error } = schema.validate(data, {abortEarly: false});
    if (error) {
      // para que el middleware procese el erro => next + el error
      next(boom.badRequest(error));
    }
    // si no hay error debe seguir la ejecución
    next();
  }
}


module.exports = validatorHandler;
