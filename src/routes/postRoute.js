const { Router } = require('express');
const postController = require('../controllers/postController');

const isValid = require('../middlewares/validPost');
const isAuth = require('../middlewares/tokenAuth');

const postRoute = Router();

postRoute.post('/', isAuth.validToken, isValid.validPost, postController.create);

postRoute.get('/', isAuth.validToken, postController.getAll);

postRoute.get('/:id', isAuth.validToken, postController.getById);

postRoute.put('/:id', isAuth.validToken, isValid.validPost, postController.update);

module.exports = postRoute;