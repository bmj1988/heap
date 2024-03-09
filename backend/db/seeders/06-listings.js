'use strict';

const { Listing, Sequelize } = require('../models');

let options = {};
options.tableName = 'Listings';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Listing.bulkCreate([
      {
        shopId: 1,
        ownerId: 1,
      },
      {
        shopId: 2,
        ownerId: 1,
      },
      {
        shopId: 1,
        ownerId: 1,
        open: false
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      where: {
        shopId: { [Op.in]: [1, 2] }
      }
    })
  }
};
