const { DataTypes } = require('sequelize');
const connectToDatabase = require('../data/dbConnection');

let models = {};

const initModels = async () => {
    const sequelize = await connectToDatabase();

    models.Client = sequelize.define('Client', {
      id_clientDPI: {
        type: DataTypes.STRING(13),
        primaryKey: true,
        allowNull: false,
      },
      id_client: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      source: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    }, {
      freezeTableName: true,
      timestamps: false,
    });
  
    return models;
  };

module.exports = { initModels, models };
