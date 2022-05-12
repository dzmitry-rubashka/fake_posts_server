import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.RefreshToken = User.hasOne(models.RefreshToken);
    }

    static async hashPassword(password) {
      return bcrypt.hash(password, 10);
    }

    static async createNewUser({
      name,
      username,
      email,
      address,
      phone,
      website,
      password,
      refreshToken,
    }) {
      return sequelize.transaction(() => {
        return User.create(
          {
            name,
            username,
            email,
            address,
            phone,
            website,
            password,
            RefreshToken: { token: refreshToken },
          },
          { include: [User.RefreshToken] }
        );
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING(50),
        unique: false,
        validate: {
          len: {
            args: [2, 50],
            msg: "Name must contain between 2 and 50 characters",
          },
        },
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          len: {
            args: [2, 50],
            msg: "Username must contain between 2 and 50 characters",
          },
        },
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
      address: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          len: {
            args: [6, 50],
            msg: "Phone number must contain between 6 and 50 characters",
          },
        },
      },
      website: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          len: {
            args: [3, 50],
            msg: "Website name must contain between 3 and 50 characters",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "users",
      defaultScope: { attributes: { exclude: ["password"] } },
      scopes: {
        withPassword: {
          attributes: { include: ["password"] },
        },
      },
    }
  );

  User.prototype.comparePasswords = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.beforeSave(async (user, options) => {
    if (user.password) {
      const hashedPassword = await User.hashPassword(user.password);
      user.password = hashedPassword;
    }
  });

  User.afterCreate((user, options) => {
    delete user.dataValues.password;
  });

  User.associate = function (models) {
    User.hasMany(models.Post, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "posts",
    });
    User.hasMany(models.Comment, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      as: "comments",
    });
    User.belongsToMany(models.Company, {
      through: "user_company",
      as: "companies",
      foreignKey: "user_id",
    });
  };

  return User;
};
