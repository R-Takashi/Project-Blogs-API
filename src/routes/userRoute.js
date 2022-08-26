const { Router } = require('express');
const userController = require('../controllers/userController');

const isValid = require('../middlewares/validUser');
const isAuth = require('../middlewares/tokenAuth');

const userRoute = Router();

userRoute.post('/', isValid.validUser, userController.create);

userRoute.get('/', isAuth.validToken, userController.getAll);

module.exports = userRoute;