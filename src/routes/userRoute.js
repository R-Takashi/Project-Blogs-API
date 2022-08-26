const { Router } = require('express');
const userController = require('../controllers/userController');

const isValid = require('../middlewares/validUser');

const userRoute = Router();

userRoute.post('/', isValid.validUser, userController.create);

module.exports = userRoute;