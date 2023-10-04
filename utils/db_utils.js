const mssql = require('mssql');

const createDbConnection = async () => {
    const sqlConfig = {

        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        server: process.env.DB_SERVER,
        options: {
        trustServerCertificate: true
        }
    };

    const db = await mssql.connect(sqlConfig);
    return db;
};

const testDbConnection = async () => {

    try {
        const db = await createDbConnection();
        db.close();
        console.log('Connection DB - OK');
        return true;
    }

    catch(error) {
        console.log('Connection DB - Error');
        console.error(error);
        return false;
    }
}

module.exports = {
    createDbConnection,
    testDbConnection
}