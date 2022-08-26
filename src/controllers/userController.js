const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const { JWT_SECRET } = process.env;

const create = async (req, res) => {
  try {
    const userInfo = req.body;

    const newUser = await userService.create(userInfo);

    if (newUser.message) {
      return res.status(409).json(newUser);
    }

    const token = jwt.sign({ email: userInfo.email }, JWT_SECRET);

    return res.status(201).json({ token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server Error', error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await userService.getAll();

    return res.status(200).json(users);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server Error', error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getById(id);

    if (user.message) {
      return res.status(404).json(user);
    }

    return res.status(200).json(user);
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