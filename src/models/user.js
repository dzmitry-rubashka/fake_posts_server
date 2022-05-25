import { Model, DataTypes } from 'sequelize';

const registerUser = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'posts',
      });
      User.hasMany(models.Comment, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'comments',
      });
      User.belongsToMany(models.Company, {
        through: "usersCompanies",
        as: 'companies',
        foreignKey: 'user_id',
        otherKey: 'company_id',
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
            msg: 'Name must contain between 2 and 50 characters',
          },
        },
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          len: {
            args: [2, 50],
            msg: 'Username must contain between 2 and 50 characters',
          },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Not a valid email address',
          },
          notNull: {
            msg: 'Email is required',
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
            args: [0, 50],
            msg: 'Phone number must contain between 6 and 50 characters',
          },
        },
      },
      website: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          len: {
            args: [3, 50],
            msg: 'Website name must contain between 3 and 50 characters',
          },
        },
      },
      password: {
        type: DataTypes.STRING(1000),
        validate: {
          len: {
            args: [8, 1000],
            msg: 'Password must contain between 8 and 1000 characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );

  return User;
};

export { registerUser };