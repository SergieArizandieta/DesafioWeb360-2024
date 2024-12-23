const { DataTypes } = require('sequelize');
const connectToDatabase = require('../data/dbConnection');

let models = {};

const initModels = async () => {
    const sequelize = await connectToDatabase();

    models.Order = sequelize.define('Order', {
      id_order: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      delivery_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
      },
      client_id_client: {
        type: DataTypes.CHAR(13),
        allowNull: false,
      },
      user_id_user: {
        type: DataTypes.CHAR(13),
        allowNull: false,
      },
    }, {
      freezeTableName: true,
      timestamps: false,  
    });
  
    return models;
  };

module.exports = { initModels, models };
