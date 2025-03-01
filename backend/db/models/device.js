'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Device.hasMany(models.Fitting, { foreignKey: 'deviceId'});
    }
  }
  Device.init({
    deviceName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {}
    },
    volume: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {}
    },
  }, {
    sequelize,
    modelName: 'Device',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
        // exclude: [, "id", "createdAt", "updatedAt"]
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
  return Device;
};
