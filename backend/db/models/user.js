'use strict';
const {
  Model,
  Validator,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Agent, { foreignKey: 'userId', onDelete: 'CASCADE', as: 'Agent Info' })

      User.hasOne(models.Owner, { foreignKey: 'userId', onDelete: 'CASCADE', as: 'Owner Info' })

      User.hasMany(models.Message, { foreignKey: 'fromId', onDelete: 'CASCADE', as: 'Sender' })

      User.hasMany(models.Message, { foreignKey: 'toId', onDelete: 'CASCADE', as: 'Recipient' })
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
        isAlpha: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
        isAlpha: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {args: true, msg: "This email address belongs to another user!"},
      validate: {
        len: [3, 256],
        isEmail: {args: true, msg: "Must provide a valid email address"}
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    agent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    owner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ],
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
