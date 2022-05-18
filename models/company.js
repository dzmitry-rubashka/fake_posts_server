import { Model, DataTypes } from 'sequelize';

const registerCompany = (sequelize) => {
  class Company extends Model {

    static associate(models) {
      Company.belongsToMany(models.User, {
        through: "usersCompanies",
        as: "users",
        foreignKey: "company_id",
        otherKey: "user_id",
      });
    }
  }

  Company.init(
    {
      name: {
        type: DataTypes.STRING(100),
        unique: true,
        validate: {
          len: {
            args: [2, 100],
            msg: "Name must contain between 2 and 100 characters",
          },
        },
      },
      catchPhrase: {
        type: DataTypes.TEXT,
      },
      bs: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Company',
      tableName: 'companies',
    }
  );

  return Company;
};

export { registerCompany };