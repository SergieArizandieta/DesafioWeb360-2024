const { DataTypes } = require('sequelize');
const connectToDatabase = require('../data/dbConnection');

let models = {};

const initModels = async () => {
    const sequelize = await connectToDatabase();

    models.Product = sequelize.define('Product', {
        id_product: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(18, 2),
          allowNull: false,
        },
        creation_date: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        picture: {
          type: DataTypes.BLOB,
          allowNull: false,
        },
        category_id_category: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
