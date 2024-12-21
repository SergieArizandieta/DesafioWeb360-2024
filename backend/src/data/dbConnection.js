const { Sequelize } = require('sequelize');
const dbConfig = require('../config/dbConfig');
let connectionPool;

async function connectToDatabase() {
    if (!connectionPool) {
        try {
            connectionPool = new Sequelize( dbConfig );
            await connectionPool.authenticate();
            console.log('Connected to SQL Server!');
        } catch (err) {
            throw err;
        }
    }
    return connectionPool; 
}

module.exports = connectToDatabase;


