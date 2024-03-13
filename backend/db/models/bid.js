'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bid.belongsTo(models.Agent, { foreignKey: 'agentId', onDelete: 'CASCADE' })

      Bid.belongsTo(models.Listing, { foreignKey: 'listingId', onDelete: 'CASCADE' })

      Bid.hasMany(models.Message, { foreignKey: 'bidId' })
    }
  }
  Bid.init({
    offer: {
      type: DataTypes.INTEGER,
      allowNull: { args: false, msg: "Must include an offer!" }
    },
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    listingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    acceptedOn: {
      type: DataTypes.DATE,
    },
    message: {
      type: DataTypes.TEXT,
      defaultValue: null,
      validate: {
        ifNotNull(value) {
          if (value && value.length > 500) {
            throw new Error('Limit messages to 500 characters.')
          }
        }
      }
    },

    seen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'Bid',
    indexes: [
      {
        unique: { args: true, msg: "You can only place one bid on a listing. If you wish to edit your bid, do so through your open bids panel." },
        fields: ['listingId', 'agentId']
      }
    ]
  });
  return Bid;
};
