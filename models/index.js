// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.resolve()
// let models = {};
//
// export function registerModels(sequelize) {
//   const thisFile = path.basename(__filename);
//   const modelFiles = fs.readdirSync(__dirname);
//   const filteredModelFiles = modelFiles.filter((file) => {
//     return file !== thisFile && file.slice(-3) === '.js';
//
//   });
//
//   for (const file of filteredModelFiles) {
//     const model = import(path.join(__dirname, file)).default(sequelize);
//     models[model.name] = model;
//   }
//   Object.keys(models).forEach((modelName) => {
//     if (models[modelName].associate) {
//       models[modelName].associate(models);
//     }
//   });
//
//   models.sequelize = sequelize;
// }
//
// export default models;


import { registerUser } from './user.js';

let models = {};

export function registerModels(sequelize) {
  models.User = registerUser(sequelize);
  models.sequelize = sequelize;
}
export default models;
console.log(models, 333);
