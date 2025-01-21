'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Audiograms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
        onDelete: 'SET NULL'
      },
      f250: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      f500: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      f750: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      f1000: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      f1500: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      f2000: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      f3000: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      f4000: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      f6000: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      f8000: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Audiograms";
    await queryInterface.dropTable(options);
  }

};
