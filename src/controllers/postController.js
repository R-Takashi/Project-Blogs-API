const jwt = require('jsonwebtoken');
const postService = require('../services/postService');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

const create = async (req, res) => {
  const token = req.headers.authorization;
  
  const { email } = jwt.verify(token, JWT_SECRET);

  const { dataValues: { id } } = await User.findOne({ where: { email } });
  
  try {
    const postInfo = req.body;

    const categoryExists = await postService.verifyCategoryExists(postInfo.categoryIds);
    
    if (categoryExists.message) {
      return res.status(400).json(categoryExists);
    }
    const newPost = await postService.create(postInfo, id);
    
    return res.status(201).json(newPost);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server Error', error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await postService.getAll();

    return res.status(200).json(posts);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server Error', error: err.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postService.getById(id);

    if (post.message) {
      return res.status(404).json(post);
    }

    return res.status(200).json(post);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};