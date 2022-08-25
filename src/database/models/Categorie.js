module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
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

  Categorie.associate = (models) => {
    Categorie.hasMany(models.PostCategorie, {
      foreignKey: 'categoryId',
      as: 'categorie',
    });
  }

  return Categorie;
};