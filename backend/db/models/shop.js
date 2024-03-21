'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {

    static associate(models) {
      Shop.belongsTo(models.Owner, { foreignKey: 'ownerId' , onDelete: 'CASCADE'  })

      Shop.hasMany(models.Listing, { foreignKey: 'shopId', onDelete: 'CASCADE' })

      Shop.hasMany(models.ShopReview, { foreignKey: 'shopId' })

      Shop.hasMany(models.ClosedListing, { foreignKey: 'shopId' })
    }
  }
  Shop.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: {args: false, msg: "You must provide a street address for all listings and shops."},
      validate: {
        notEmpty: {args: true,  msg: "You must provide a street address for all listings and shops."}
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: {args: false, msg: "You must provide a city for all listings and shops."},
      validate: {
        notEmpty: {args: true, msg: "You must provide a city for all listings and shops."}
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: {args: false, msg: "You must provide a state for all listings and shops."},
      validate: {
        notEmpty: {args: true, msg: "You must provide a state for all listings and shops."}
      }
    },
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shop',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    },
  });
  return Shop;
};
