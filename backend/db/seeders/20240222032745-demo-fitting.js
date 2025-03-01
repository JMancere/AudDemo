'use strict';

const { Fitting } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Fitting.bulkCreate([
      {
        userId: 1,
        audiogramId: 1,
        deviceId: 1,
        fitName: 'test1',
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Fittings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
