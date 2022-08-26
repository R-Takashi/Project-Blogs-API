const { BlogPost, PostCategory, Category, User, sequelize } = require('../database/models');

const verifyCategoryExists = async (categoryIds) => {
  const { rows } = await Category.findAndCountAll({
    where: {
      id: categoryIds,
    },
  });

  if (rows.length !== categoryIds.length) {
    return { message: '"categoryIds" not found' };
  }

  return true;
};

const create = async (postInfo, userId) => {
  const { title, content } = postInfo;
  const transactionResult = await sequelize.transaction(async (transaction) => {
    const createdPost = await BlogPost.create(
      { title, content, userId },
      { transaction },
    );

    const postId = createdPost.dataValues.id;

    const postCategories = postInfo.categoryIds
      .map((categoryId) => ({ postId, categoryId }));

    await PostCategory.bulkCreate(
      postCategories,
      { transaction },
    );

    return createdPost;
  });

  return transactionResult;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [{
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      }, {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
    },
    ],
  });

  return posts;
};

module.exports = {
  create,
  verifyCategoryExists,
  getAll,
};