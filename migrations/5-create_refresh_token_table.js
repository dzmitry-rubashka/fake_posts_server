'use strict';
const { DataTypes } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('refreshTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      token: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'users' }, key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('refreshTokens');
  },
};
