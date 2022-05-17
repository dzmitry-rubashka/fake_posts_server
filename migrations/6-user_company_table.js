"use strict";

const { DataTypes } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("usersCompanies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'companies',
        //   key: 'id'
        // }
      },
      company_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'users',
        //   key: 'id'
        // }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("usersCompanies");
  },
};