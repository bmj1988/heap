'use strict';


const { Message, Sequelize } = require('../models');

let options = {};
options.tableName = 'Listings';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Message.bulkCreate([
      {
        toId: 1,
        fromId: 2,
        bidId: 1,
        seen: false,
        content: "Hello there"
      },
      {
        toId: 2,
        fromId: 1,
        bidId: 1,
        seen: false,
        content: "hi sir"
      },
      {
        toId: 1,
        fromId: 2,
        bidId: 1,
        seen: false,
        content: "how are you"
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
