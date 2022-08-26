module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    published: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
    }}, 
    {
      updatedAt: 'updated',
      createdAt: 'published',
      tableName: 'BlogPosts',
    });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })
  }

  return BlogPost;
};