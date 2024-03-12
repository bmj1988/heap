'use strict';

const { Agent, Sequelize } = require('../models');

let options = {};
options.tableName = 'Agents';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Agent.bulkCreate([
      {
        userId: 2,
        license: '1',
        city: 'LA',
        state: 'CA'
      },
      {
        userId: 4,
        license: '2',
        city: 'Philadelphia',
        state: 'PA'
      },
      {
        userId: 7,
        license: '3',
        city: 'New York',
        state: 'NY'
      },
      {
        userId: 8,
        license: '4',
        city: 'Washington',
        state: 'DC'
      }
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [2, 4, 7, 8] }
    }, {})
  }
};
