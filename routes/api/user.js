const Users = require('../../models/user.js');

module.exports = {
  getAllUsers: (req, res, next) => {
    Users.getUsers(req, (err, data) => {
      if (err) {
        next(err);
      } else {
        console.log(data);
        res.send(data);
      }
    });
  },
}
