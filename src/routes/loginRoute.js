const { Router } = require('express');

const loginController = require('../controllers/loginController');
const isValid = require('../middlewares/validLogin');

const loginRoute = Router();

loginRoute.post('/', isValid.validLogin, loginController.login);

module.exports = loginRoute;