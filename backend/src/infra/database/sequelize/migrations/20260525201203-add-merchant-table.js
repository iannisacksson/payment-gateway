'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('merchants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      personType: {
        name: 'person_type',
        allowNull: false,
        type: Sequelize.STRING,
      },
      documentNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'document_number',
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
        deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'deleted_at',
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('merchants');
  }
};
