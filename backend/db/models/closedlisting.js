'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClosedListing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ClosedListing.belongsTo(models.Shop, { foreignKey: 'shopId', onDelete: 'CASCADE' })
      ClosedListing.belongsTo(models.Owner, { foreignKey: 'ownerId', onDelete: 'CASCADE' })
      ClosedListing.belongsTo(models.Agent, { foreignKey: 'agentId', onDelete: 'CASCADE' })

    }
  }
  ClosedListing.init({
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: { args: false, msg: 'A closed listing must belong to a shop' }
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: { args: false, msg: 'A closed listing must belong to an owner' }
    },
    winningBid: {
      type: DataTypes.INTEGER,
      allowNull: { args: false, msg: 'A closed listing must have a winning bid' }
    },
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: { args: false, msg: 'A closed listing must belong to an agent' }
    },
    listedOn: {
      type: DataTypes.DATE,
      allowNull: { args: false, msg: 'A closed listing must show when the original listing was posted.'}
    }
  }, {
    sequelize,
    modelName: 'ClosedListing',
  });
  return ClosedListing;
};
