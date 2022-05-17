"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("usersCompanies", [
      {
        "user_id": 1,
        "company_id": 1,
      },
      {
        "user_id": 1,
        "company_id": 2,
      },
      {
        "user_id": 2,
        "company_id": 2,
      },
      {
        "user_id": 3,
        "company_id": 3,
      },
      {
        "user_id": 3,
        "company_id": 4,
      },
      {
        "user_id": 3,
        "company_id": 5,
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("usersCompanies", null, {});
  },
};

