'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Owner.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' })

      Owner.hasMany(models.Shop, { foreignKey: 'ownerId'})

      Owner.hasMany(models.AgentReview, { foreignKey: 'ownerId'})

      Owner.hasMany(models.Listing, {foreignKey: 'ownerId'})
    }
  }
  Owner.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: { args: true, msg: "This user already has a Vendor account" },
    }
  }, {
    sequelize,
    modelName: 'Owner',
    indexes: [
      {
        unique: true,
        fields: ['userId']
      }
    ]
  });
  return Owner;
};
