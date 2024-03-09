'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Card.belongsTo(models.Agent, { foreignKey: 'agentId', onDelete: 'CASCADE' })
    }
  }
  Card.init({
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: {args: false, msg: "Must specify a name for the material"}
    },
    price: {
      type:DataTypes.FLOAT,
      allowNull: {args: false, msg: "Must include a price for all materials"}
    }
  }, {
    sequelize,
    modelName: 'Card',
    indexes: [
      {
        unique: true,
        fields: ['agentId', 'name']
      }
    ]
  });
  return Card;
};
