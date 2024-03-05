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
      Bid.belongsTo(models.Agent, { foreignKey: 'agentId' })

      Bid.belongsTo(models.Listing, { foreignKey: 'listingId' })

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
    message: {
      type: DataTypes.TEXT,
      defaultValue: null
    },

    seen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'Bid',
  });
  return Bid;
};
