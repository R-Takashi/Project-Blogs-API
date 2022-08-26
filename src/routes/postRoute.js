const { Router } = require('express');
const postController = require('../controllers/postController');

const isValid = require('../middlewares/validPost');
const isAuth = require('../middlewares/tokenAuth');

const postRoute = Router();

postRoute.post('/', isAuth.validToken, isValid.validPost, postController.create);

module.exports = postRoute;