const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginService.login(email, password);

    if (user.message) {
      return res.status(400).json(user);
    }

    const token = jwt.sign({ email, password }, JWT_SECRET);

    return res.status(200).json({ token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  login,
};
