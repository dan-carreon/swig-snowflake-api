const snowflake = require('snowflake-sdk')
const genericPool = require("generic-pool");
const config = require('../config')

const factory = {
    create: () => {
        return new Promise((resolve, reject) => {
            // Create Connection
            const connection = snowflake.createConnection({
                timeout: 15 * 1000,
                account: config.snowflake_account,
                role: config.snowflake_role,
                username: config.snowflake_user,
                password: config.snowflake_password,
                database: config.snowflake_database,
                schema: config.snowflake_schema,
                warehouse: config.snowflake_warehouse,
                clientSessionKeepAlive: true
            });
            // Try to connect to Snowflake, and check whether the connection was successful.
            connection.connect((err, conn) => {
                if (err) {
                    console.error('Unable to connect: ' + err.message);
                    reject(new Error(err.message));
                } else {
                    console.log('Successfully connected to Snowflake, ID:', conn.getId());
                    resolve(conn);
                }
            });
        });
    },
    destroy: (connection) => {
        return new Promise((resolve, reject) => {
            connection.destroy((err, conn) => {
                if (err) {
                    console.error('Unable to disconnect: ' + err.message);
                } else {
                    console.log('Disconnected connection with id: ' + conn.getId());
                }
                resolve(); // Always resolve for destroy
            });
        });
    },
    validate: (connection) => {
        return new Promise((resolve, reject) => {
            resolve(connection.isUp());
        });
    }
};

const opts = {
    max: config.pool_max, // Maximum size of the pool,
    min: 2, // Minimum size of the pool,
    testOnBorrow: false, // Validate connection before acquiring it
    acquireTimeoutMillis: 60000, // Timeout to acquire connection
    evictionRunIntervalMillis: 900000, // Check every 15 min for ideal connection
    numTestsPerEvictionRun: 4, // Check only 4 connections every 15 min
    idleTimeoutMillis: 10800000 // Evict only if connection is idle for 3 hrs
};

const myPool = genericPool.createPool(factory, opts);

const query = (sqlText, bindParams = []) => {
    return new Promise((resolve, reject) => {
        // Acquire connection from pool
        myPool.acquire().then(connection => {
            // Execute the query
            connection.execute({
                sqlText: sqlText,
                binds: bindParams,
                complete: (err, stmt, rows) => {
                    console.log(`Conn: ${connection.getId()} fetched ${rows && rows.length} rows`);
                    // Return result
                    err ? reject(new Error(err.message)) : resolve(rows);
                    // Return connection back to pool
                    myPool.release(connection);
                }
            });
        }).catch(err => reject(new Error(err.message)));
    });
}

module.exports = {query};
