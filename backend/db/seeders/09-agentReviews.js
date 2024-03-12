'use strict';

const { AgentReview, Sequelize } = require('../models');

let options = {};
options.tableName = 'ShopReviews';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await AgentReview.bulkCreate([
      {
        agentId: 1,
        ownerId: 1,
        message: 'Nice guy',
        rating: 4
      },
      {
        agentId: 2,
        ownerId: 1,
        message: 'Ok guy',
        rating: 3
      },
      {
        agentId: 1,
        ownerId: 2,
        message: 'bad place',
        rating: 2
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    Op = Sequelize.Op
    queryInterface.bulkDelete(options,
      {
        where: {
          id: { [Op.in]: [1, 2, 3] }
        }
      })
  }
};
