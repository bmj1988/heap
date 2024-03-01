'use strict';

const { ShopReview, Sequelize } = require('../models');

let options = {};
options.tableName = 'ShopReviews';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ShopReview.bulkCreate([
      {
        agentId: 1,
        shopId: 1,
        message: 'Nice place',
        rating: 4
      },
      {
        agentId: 2,
        shopId: 1,
        message: 'Ok place',
        rating: 3
      },
      {
        agentId: 1,
        shopId: 2,
        message: 'bad place',
        rating: 2
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    Op = Sequelize.Op
    queryInterface.bulkDelete(options,
      {
        where: {
          id: { [Op.in]: [1, 2, 3] }
        }
      })
  }
};
