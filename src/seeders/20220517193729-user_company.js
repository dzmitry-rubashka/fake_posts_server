"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("usersCompanies", [
      {
        user_id: 1,
        company_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        company_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        company_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        company_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        company_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        company_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("usersCompanies", null, {});
  },
};
