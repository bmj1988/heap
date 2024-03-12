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
      Agent.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE'})

      Agent.hasMany(models.Bid, {foreignKey: 'agentId'})

      Agent.hasMany(models.Card, {foreignKey: 'agentId'})

      Agent.hasMany(models.AgentReview, {foreignKey: 'agentId'})

      Agent.hasMany(models.ShopReview, {foreignKey: 'agentId'})
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
      unique: {args: true, msg: "This Agent license number belongs to another user"},
      validate: {
        notEmpty: {args: true, msg: "Must provide a license #"}
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: {args: false, msg: "Must specify a city"},
      validate: {
        notEmpty: {args: true, msg: "Must provide a city"}
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: {args: false, msg: "Must specify a state"},
      validate: {
        notEmpty: {args: true, msg: "Must provide a state"}
      }
    },
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
