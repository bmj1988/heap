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
      Listing.belongsTo(models.Shop, { foreignKey: 'shopId' })

      Listing.hasMany(models.Bid, { foreignKey: 'listingId' })
    }
  }
  Listing.init({
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Scrap for sale"
    },
    price: {
      type: DataTypes.STRING,
      defaultValue: "Best offer",
      allowNull: false
    },
    image: DataTypes.STRING,
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
    defaultScope: {
      where: { open: true }
    },
    scopes: {
      history: {
        where: { open: false }
      },
      agentView: {
        attributes: {
          exclude: ['highest', 'seen', 'shopId']
        }
      }
    }
  });
  return Listing;
};
