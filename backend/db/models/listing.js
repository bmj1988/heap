'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Listing.belongsTo(models.Shop, { foreignKey: 'shopId', onDelete: 'CASCADE' })

      Listing.belongsTo(models.Owner, { foreignKey: 'ownerId', onDelete: 'CASCADE' })

      Listing.hasMany(models.Bid, { foreignKey: 'listingId', onDelete: 'CASCADE' })

      Listing.hasMany(models.Image, { foreignKey: 'listingId', onDelete: 'CASCADE' })
    }
  }
  Listing.init({
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Scrap for sale",
      validate: {
        len: { args: [0, 800], msg: "Keep it brief! Descriptions should be no longer than 750 characters." }
      }
    },
    price: {
      type: DataTypes.STRING,
      defaultValue: "Best offer",
      allowNull: false
    },
    open: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    highest: {
      type: DataTypes.INTEGER,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Listing',
    scopes: {
      awaitingPickup: {
        where: { open: false }
      },
      agentView: {
        attributes: {
          exclude: ['seen', 'shopId']
        },
        where: { open: true }
      }
    }
  });
  return Listing;
};
