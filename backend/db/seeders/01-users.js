'use strict';

const { User, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Users';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {


  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        firstName: 'Mike',
        lastName: 'Williams',
        owner: true,
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: ''
      },
      {
        email: 'user1@user.io',
        firstName: 'Keenan',
        lastName: 'Allen',
        agent: true,
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: ''
      },
      {
        email: 'user2@user.io',
        firstName: 'AJ',
        lastName: 'Brown',
        owner: true,
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: ''
      },
      {
        email: 'user3@user.io',
        firstName: 'Devonta',
        lastName: 'Smith',
        agent: true,
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: ''
      }
    ], { validate: true })
  },



  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['demo@user.io', 'user1@user.io', 'user2@user.io', 'user3@user.io'] }
    })
  }
}
