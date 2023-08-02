// programación orientada a objetos POO
// aca va toda la logica de los datos
//const { faker } = require('@faker-js/faker');

// conectar con usuario
//const getConnection = require('../libs-conection/postgres');
const boom = require('@hapi/boom');
const { models }= require('../libs-conection/sequelize');


class usersService {

  constructor() {
    this.users = [];
  }

  async generate(data) {
    return data;
  }


  //---------------------------------------------------------
  async create(data) {
    const newUser = await models.User.create(data)
    return newUser;
  }
  //------------------------------------------------------
  async find() {
    // POO
    const rta = await models.User.findAll({
     // para tener la relación desde el usuario
      include:  ['customer']
  });
   return rta;
  }
  //---------------------------------------------------------
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      // throw para enviar el error
      throw boom.notFound('user not found');
    }
    return user;
  }
  //---------------------------------------------------------
  async update(id, changes) {
    // para no copar lo mismp del findOne
    // aplicamos la recursividad
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }
  //---------------------------------------------------------
  async delete(id) {
    const user = await  this.findOne(id);
    await user.destroy();
    return {id};
  }
}

module.exports = usersService;
