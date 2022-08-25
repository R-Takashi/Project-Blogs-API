module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name : {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    updatedAt: false,
    underscored: true,
    tableName: 'Categories',
  });

  Category.associate = (models) => {
    Category.hasMany(models.PostCategorie, {
      foreignKey: 'categoryId',
      as: 'category',
    });
  }

  return Category;
};