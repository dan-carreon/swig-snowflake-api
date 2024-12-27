const snowflake = require('../database/snowflake.js');

const Stores = function () {
}

Stores.getStores = (cb) => {
    const sql =
        'select * ' +
        'from swig.public.store;';
    snowflake.query(sql)
        .then(rows => {
            cb(null, rows)
        }).catch(err => {
        cb(err, null)
    });
}

module.exports = Stores;
