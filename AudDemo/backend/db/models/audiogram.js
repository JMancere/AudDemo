'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Audiogram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Audiogram.hasMany(models.Fitting, { foreignKey: 'audiogramId'});
      Audiogram.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      );
    }
  }
  Audiogram.init({
    userId: {
      type: DataTypes.INTEGER,
      validate: {}
    },
    f250: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {}
    },
    f500: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {}
    },
    f750: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {}
    },
    f1000: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {}
    },
    f1500: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {}
    },
    f2000: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {}
    },
    f3000: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {}
    },
    f4000: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {}
    },
    f6000: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {}
    },
    f8000: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {}
    },
  }, {
    sequelize,
    modelName: 'Audiogram',
    defaultScope: {
      attributes: {
        //exclude: ["createdAt", "updatedAt"]
      }
    },
    // scopes: {
    //   isOwner: {
    //     attributes: {
    //       //exclude: ["createdAt", "updatedAt"]
    //     }
    //   },
    // }
  });
  return Audiogram;
};
