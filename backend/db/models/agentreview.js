'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AgentReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AgentReview.belongsTo(models.Owner, { foreignKey: 'ownerId', onDelete: 'CASCADE' })

      AgentReview.belongsTo(models.Agent, { foreignKey: 'agentId', onDelete: 'CASCADE' })
    }
  }
  AgentReview.init({
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      validate: {
        len: {args: [0,500], msg: "Limit message length to 500 characters."}
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: {args: false, msg: "No rating provided."}
    }
  }, {
    sequelize,
    modelName: 'AgentReview',
  });
  return AgentReview;
};
