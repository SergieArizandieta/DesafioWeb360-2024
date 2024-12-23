const { DataTypes } = require('sequelize');
const connectToDatabase = require('../data/dbConnection');

let models = {};

const initModels = async () => {
    const sequelize = await connectToDatabase();

    models.User = sequelize.define('User', {
      id_userDPI: {
        type: DataTypes.CHAR(13),
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(256), 
        allowNull: false,
        unique: true,
      },
      // refresh_token: {
      //   type: DataTypes.STRING(255),
      //   allowNull: false,
      // },
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // password: {
      //   type: DataTypes.STRING(255),
      //   allowNull: false,
      // },
      phone: {
        type: DataTypes.CHAR(8),
        allowNull: false,
        unique: true,
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('GETDATE()'),
      },
      status_id_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rol_id_rol: {
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
