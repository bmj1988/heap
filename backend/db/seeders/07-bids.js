'use strict';
const { Bid, Sequelize } = require('../models');

let options = {};
options.tableName = 'Bids';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Bid.bulkCreate([
      {
        offer: 5,
        agentId: 1,
        listingId: 1,
        message: 'id like to buy this'
      },
      {
        offer: 8,
        agentId: 2,
        listingId: 1,
        message: 'hello'
      },
      {
        offer: 6,
        agentId: 3,
        listingId: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      where: {
        id: { [Op.in]: [1, 2, 3] }
      }
    })
  }
};
