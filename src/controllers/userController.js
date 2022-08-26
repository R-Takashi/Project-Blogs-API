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

    const token = jwt.sign(userInfo, JWT_SECRET);

    return res.status(201).json({ token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  create,
};