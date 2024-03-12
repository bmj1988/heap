'use strict';

const { Shop, Sequelize } = require('../models');

let options = {};
options.tableName = 'Shops';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Shop.bulkCreate([
      {
        ownerId: 1,
        name: "Mike's Mufflers",
        address: '123 Fake St',
        city: "Los Angeles",
        state: "CA",
        phone: "1-111-111-1111"
      },
      {
        ownerId: 1,
        name: "Mike's Auto Repair",
        address: '345 Fake St',
        city: "Los Angeles",
        state: "CA",
        phone: "1-112-112-1112"
      },
      {
        ownerId: 2,
        name: "AJ's Brake Service",
        address: '678 Nice Pl',
        city: "Philadelphia",
        state: "PA",
        phone: "1-113-113-1113"
      }
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {

      ownerId: { [Op.in]: [1, 2] }
    }, {})
  }
};
