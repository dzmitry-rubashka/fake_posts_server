import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Company extends Model {

    static associate(models) {
      Company.belongsToMany(models.User, {
        through: "user_company",
        as: "users",
        foreignKey: "company_id",
        otherKey: "user_id",
      });
    }

    static async createNewCompany({ name, catchphrase, bs }) {
      return sequelize.transaction(() => {
        return Company.create({
          name,
          catchphrase,
          bs,
        });
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
      modelName: "companies",
    }
  );

  return Comment;
};
