const categoryService = require('../services/categoryService');

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = await categoryService.create(name);

    if (newCategory.message) {
      return res.status(409).json(newCategory);
    }

    return res.status(201).json(newCategory);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server Error', error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAll();

    return res.status(200).json(categories);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  create,
  getAll,
};