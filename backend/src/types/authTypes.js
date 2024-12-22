const { DataTypes } = require('sequelize');
const connectToDatabase = require('../data/dbConnection');

let models = {};

const initModels = async () => {
    const sequelize = await connectToDatabase();

    models.User = sequelize.define("User", {
         id_userDPI: {
            type: DataTypes.CHAR(13),
            primaryKey: true,
         },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        refresh_token: {
            type: DataTypes.STRING, // Agrega este campo para el token de refresco
          },
    },{
      freezeTableName: true,
      timestamps: false,
    });

    return models;
};

module.exports = { initModels, models };
