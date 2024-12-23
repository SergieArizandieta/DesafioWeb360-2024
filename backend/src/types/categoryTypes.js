const { DataTypes } = require('sequelize');
const connectToDatabase = require('../data/dbConnection');

let models = {};

const initModels = async () => {
    const sequelize = await connectToDatabase();

    models.Category = sequelize.define('Category', {
      id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      creation_date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('GETDATE()'),
      },
      status_id_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      freezeTableName: true,
      timestamps: false, 
    });
  
    return models;
  };

module.exports = { initModels, models };
