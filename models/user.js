const snowflake = require('../database/snowflake.js');

const Users = function () {
}

Users.getUsers = (req, cb) => {
    const sql =
        'select * ' +
        'from swig.public.user' +
        req.orderBy + req.limit;
    snowflake.query(sql)
        .then(rows => {
            cb(null, rows)
        }).catch(err => {
        cb(err, null)
    });
}

module.exports = Users;
