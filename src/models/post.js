import { Model, DataTypes } from 'sequelize';

const registerPost = (sequelize) => {
  class Post extends Model {

    static associate(models) {
      Post.belongsTo(models.User, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "user_id",
      });
      Post.hasMany(models.Comment, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        as: "comments",
      });
    }
  }

  Post.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      body: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
    }
  );

  return Post;
};

export { registerPost };