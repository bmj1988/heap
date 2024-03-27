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
      User.hasOne(models.Agent, { foreignKey: 'userId', onDelete: 'CASCADE'})

      User.hasOne(models.Owner, { foreignKey: 'userId', onDelete: 'CASCADE'})

      User.hasMany(models.Message, { foreignKey: 'fromId', onDelete: 'CASCADE', as: 'Sender' })

      User.hasMany(models.Message, { foreignKey: 'toId', onDelete: 'CASCADE', as: 'Recipient' })
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: {args: false, msg: "Must provide a first name"},
      validate: {
        len: {args: [1, 30], msg: "Name must be between 1 and 30 characters long"},
        isAlpha: {args: true, msg: "Name must be in alphabetic characters"},
        notEmpty: {args: true, msg: "Must provide a first name"}
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {args: [1, 30], msg: "Name must be between 1 and 30 characters long"},
        isAlpha: {args: true, msg: "Name must be in alphabetic characters"},
        notEmpty: {args: true, msg: "Must provide a first name"}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {args: true, msg: "This email address belongs to another user!"},
      validate: {
        len: {args: [3, 256], msg: "Email must be between 3 and 256 characters long."},
        isEmail: {args: true, msg: "Must provide a valid email address"}
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: {args: [60, 60], msg: "Hashed password must be 60 characters long."}
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
      allowNull: false,
      validate: {
        notAgent(value) {
          if (this.owner === true && value === true) {
            throw new Error("Accounts cannot be both agents and vendors.")
          }
        }
      }
    },
    owner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        notAgent(value) {
          if (this.agent === true && value === true) {
            throw new Error("Accounts cannot be both agents and vendors.")
          }
        }
      },
    },
    phone: {
      type: DataTypes.STRING,
      unique: {args: true, msg: "Another user with this phone number already exists!"}
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
