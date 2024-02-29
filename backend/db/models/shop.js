'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shop.belongsTo(models.Owner, { foreignKey: 'ownerId' })

      Shop.hasMany(models.Listing, { foreignKey: 'shopId' })

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
      allowNull: false,
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
    indexes: [
      {
        unique: true,
        fields: ['ownerId']
      }
    ]
  });
  return Shop;
};
