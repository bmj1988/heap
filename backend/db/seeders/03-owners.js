'use strict';

const { Owner, Sequelize } = require('../models');
let options = {};
options.tableName = 'Owners';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Owner.bulkCreate([
      {
        userId: 1,
        locality: 'LA'
      },
      {
        userId: 3,
        locality: 'PA'
      },
      {
        userId: 5,
        locality: 'NY'
      },
      {
        userId: 6,
        locality: 'DC'
      }
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 3, 5, 6] }
    }, {})
  }
};
