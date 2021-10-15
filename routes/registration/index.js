const Express = require('express');
const Router = Express.Router();
const _routes = require('./routes');

Router
  .post('/add_user', _routes.addUser)
  .get('/users', _routes.getUsers)
  .get('/get_user/:id', _routes.getUserById)
  .get('/print_user/:id', _routes.printUserById)
  .get('/print_users', _routes.printUsers)
  .post('/delete_user', _routes.deleteUser)

module.exports = Router;
