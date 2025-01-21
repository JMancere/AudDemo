'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fitting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Spot.hasOne(models.Review, { foreignKey: 'spotId'});
      // Spot.hasOne(models.Booking, { foreignKey: 'spotId'});
      // Spot.hasOne(models.SpotImage, { foreignKey: 'spotId'});
      Audiogram.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      );

      Fitting.belongsTo(
        models.User,
        { foreignKey: 'userId' },

        models.Device,
        { foreignKey: 'deviceId',
        },
        models.Audiogram,
        { foreignKey: 'audiogramId',
        }
      );
    }
  }
  Fitting.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {}
    },
    audiogramId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {}
    },
    deviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {}
    },
    fitName: {
      type: DataTypes.STRING,
      validate: {}
    },
  }, {
    sequelize,
    modelName: 'Fitting',
    defaultScope: {
      attributes: {
        //exclude: ["createdAt", "updatedAt"]
      }
    },
  });
  return Fitting;
};
