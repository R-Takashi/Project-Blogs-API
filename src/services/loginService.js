const { User } = require('../database/models');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { message: 'Invalid fields' };
  }

  return true;
};

module.exports = {
  login,
};