'use strict';

const { Device } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Device.bulkCreate([
      {
        deviceName: "CIC",
        volume: 50,
      },
      {
        deviceName: "ITE",
        volume: 80,
      },
      {
        deviceName: "BTE",
        volume: 100,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Devices';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      volume: { [Op.in]: [50, 80, 100] }
    }, {});
  }
};
