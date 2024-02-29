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
        locality: 'LA'
      },
      {
        userId: 4,
        license: '2',
        locality: 'PA'
      }
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      license: { [Op.in]: ['1', '2'] }
    }, {})
  }
};
