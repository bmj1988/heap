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
      unique: true,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
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
