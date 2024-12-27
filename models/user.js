const snowflake = require('../database/snowflake.js');

const Users = function () {
}

Users.getUsers = (req, cb) => {

    let sql =
        'select * ' +
        'from swig.public.user ';

    if (req.orderBy) {
        sql += 'order by ' + req.orderBy + ' ASC ';
    }

    if (req.limit) {
        sql += 'limit ' + req.limit;
    }

    snowflake.query(sql)
        .then(rows => {
            cb(null, rows)
        }).catch(err => {
        cb(err, null)
    });
}

module.exports = Users;
