/*
 * Configuration File Setup
 * 1. Create a copy of this file named "config.js" in same directory
 * 2. Edit values in <>s in "config.js" corresponding to your snowflake demo
 *    instance
 */
var config = {
    snowflake_account: 'KTB88008',
    snowflake_user: 'dcarreon',
    snowflake_password: '825173712Dan!',
    snowflake_role: 'ACCOUNTADMIN',
    snowflake_database: 'PUBLIC',
    snowflake_schema: 'SWIG',
    snowflake_warehouse: 'SWIG_DATA_WAREHOUSE',
    pool_max: 200
}
module.exports = config;
