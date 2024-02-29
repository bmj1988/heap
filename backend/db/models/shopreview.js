'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShopReview.belongsTo(models.Shop, { foreignKey: 'shopId' })

      ShopReview.belongsTo(models.Agent, { foreignKey: 'agentId' })
    }
  }
  ShopReview.init({
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ShopReview',
  });
  return ShopReview;
};
