const { User } = require('../database/models');

const create = async (userInfo) => {
  const verifyUser = await User.findAll({ where: { email: userInfo.email } });
  if (verifyUser.length > 0) {
    return { message: 'User already registered' };
  }

  await User.create(userInfo);

  return true;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: {
    exclude: ['password'],
  } });

  return users;
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id },
    attributes: {
      exclude: ['password'],
    } });

  if (!user) {
    return { message: 'User does not exist' };
  }

  return user;
};

const remove = async (email) => {
  const { dataValues: { id } } = await User.findOne({ where: { email } });

  await User.destroy({ where: { id } });

  return true;
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};