module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreingKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreingKey: true,
    }},
    {
      timestamps: false,
      tableName: 'PostCategories',
    });
  
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    }),
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      as: 'post',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  }

  return PostCategory;
}