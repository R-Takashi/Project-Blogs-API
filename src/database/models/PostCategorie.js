module.exports = (sequelize, DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie', {
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
      updatedAt: false,
      underscored: true,
      tableName: 'PostCategories',
    });
  
  PostCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.BlogPost, {
      through: PostCategorie,
      as: 'post',
      foreignKey: 'postId',
      otherKey: 'categorieId',
    }),
    models.Categories.belongsToMany(models.Categories, {
      through: PostCategorie,
      as: 'categorie',
      foreignKey: 'categorieId',
      otherKey: 'postId',
    });
  }

  return PostCategorie;
}