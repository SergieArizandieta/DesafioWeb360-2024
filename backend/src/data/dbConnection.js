const sql = require('mssql');
const dbConfig = require('../config/dbConfig.js');

let connectionPool;

async function connectToDatabase() {
    if (!connectionPool) {
        try {
            connectionPool = await sql.connect(dbConfig);
            console.log('Connected to SQL Server!');
        } catch (err) {
            throw err;
        }
    }
    return connectionPool; // Return the single instance
}

module.exports = connectToDatabase;