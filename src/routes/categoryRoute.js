const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const isValid = require('../middlewares/validCategory');
const isAuth = require('../middlewares/tokenAuth');

const categoryRoute = Router();

categoryRoute.post('/', isAuth.validToken, isValid.validCategory, categoryController.create);

categoryRoute.get('/', isAuth.validToken, categoryController.getAll);

module.exports = categoryRoute;