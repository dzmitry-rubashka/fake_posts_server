import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Comment extends Model {

    static associate(models) {
      Comment.belongsTo(models.Post, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "post_id",
      });
      Comment.belongsTo(models.User, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: "user_id",
      });
    }

    static async createNewComment({ post_id, user_id, name, email, body }) {
      return sequelize.transaction(() => {
        return Comment.create({
          post_id,
          user_id,
          name,
          email,
          body,
        });
      });
    }
  }

  Comment.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Not a valid email address",
          },
          notNull: {
            msg: "Email is required",
          },
        },
      },
      body: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments',
    }
  );

  return Comment;
};
