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
      Message.belongsTo(models.User, { foreignKey: 'fromId', as: 'Sender', onDelete: 'CASCADE' })

      Message.belongsTo(models.User, { foreignKey: 'toId', as: 'Recipient', onDelete: 'CASCADE' })

      Message.belongsTo(models.Bid, { foreignKey: 'bidId', onDelete: 'CASCADE' })
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
    },
    seen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {args: [1, 1000], msg: "Messages cannot be blank and must be limited to 1000 characters."}
      }
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
