import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
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

    static async createNewPost({ user_id, title, body }) {
      return sequelize.transaction(() => {
        return Post.create({
          user_id,
          title,
          body,
        });
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
      modelName: "posts",
    }
  );

  return Post;
};
