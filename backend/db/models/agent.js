'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Agent.belongsTo(models.User, {foreignKey: 'userId'})

      Agent.hasMany(models.Bid, {foreignKey: 'agentId', onDelete: 'CASCADE'})

      Agent.hasMany(models.Card, {foreignKey: 'agentId', onDelete: 'CASCADE'})

      Agent.hasMany(models.AgentReview, {foreignKey: 'agentId', onDelete: 'CASCADE'})

      Agent.hasMany(models.ShopReview, {foreignKey: 'agentId', onDelete: 'CASCADE'})
    }
  }
  Agent.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: {args: true, msg: "This user already has an Agent account!"},
    },
    license: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {args: true, msg: "This Agent license number belongs to another user"}
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: {args: false, msg: "Must list a location"},
    }
  }, {
    sequelize,
    modelName: 'Agent',
    indexes: [
      {
        unique: true,
        fields: ['userId']
      }
    ]
  });
  return Agent;
};
