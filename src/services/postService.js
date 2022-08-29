const { BlogPost, PostCategory, Category, User,
  sequelize, Sequelize } = require('../database/models');

const { Op } = Sequelize;

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

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
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

  if (!post) return { message: 'Post does not exist' };

  return post;
};

const verifyAuthorPost = async (postId, userId) => {
  const post = await BlogPost.findOne({
    where: { id: postId },
  });

  if (!post) return { message: 'Post does not exist', code: 404 };

  if (post.userId !== userId) return { message: 'Unauthorized user', code: 401 };

  return true;
};

const update = async (postInfo, postId) => {
  const { title, content } = postInfo;

  await BlogPost.update(
    { title, content },
    { where: { id: postId } },
  );

  const postUpdated = await getById(postId);

  return postUpdated;
};

const remove = async (postId) => {
  await BlogPost.destroy({
    where: { id: postId },
  });
  return { message: 'Post removed' };
};

const search = async (q) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }],
    },
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
  verifyAuthorPost,
  getAll,
  getById,
  update,
  remove,
  search,
};