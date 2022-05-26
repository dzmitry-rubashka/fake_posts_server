import { Model, DataTypes } from "sequelize";

const registerUsersCompanies = (sequelize) => {
  class UsersCompanies extends Model {}

  UsersCompanies.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
      },
      company_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "UsersCompanies",
      tableName: "usersCompanies",
    }
  );

  return UsersCompanies;
};

export { registerUsersCompanies };
