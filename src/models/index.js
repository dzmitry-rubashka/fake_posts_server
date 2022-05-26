import { registerUser } from "./user.js";
import { registerPost } from "./post.js";
import { registerComment } from "./comment.js";
import { registerCompany } from "./company.js";
import { registerUsersCompanies } from "./usersCompanies.js";

let models = {};

export function registerModels(sequelize) {
  models.User = registerUser(sequelize);
  models.Post = registerPost(sequelize);
  models.Comment = registerComment(sequelize);
  models.Company = registerCompany(sequelize);
  models.UsersCompanies = registerUsersCompanies(sequelize);
  models.sequelize = sequelize;

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
}
export default models;
