'use strict';

const { Audiogram } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Audiogram.bulkCreate([
      {
        userId: 1,
        f250: 10,
        f500: 10,
        f750: 10,
        f1000: 10,
        f1500: 10,
        f2000: 10,
        f3000: 10,
        f4000: 10,
        f6000: 10,
        f8000: 10,
      },
      {
        userId: 1,
        f250: 30,
        f500: 30,
        f750: 40,
        f1000: 50,
        f1500: 60,
        f2000: 70,
        f3000: 80,
        f4000: 85,
        f6000: 90,
        f8000: 55,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Audiograms';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1] }
    }, {});
  }
};
