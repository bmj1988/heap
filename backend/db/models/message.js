'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: 'fromId', as: 'Sender' })

      Message.belongsTo(models.User, { foreignKey: 'toId', as: 'Recipient' })

      Message.belongsTo(models.Bid, { foreignKey: 'bidId' })
    }
  }
  Message.init({
    toId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fromId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bidId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
