const express = require('express');
const router = express.Router();
const Users = require('../../models/user.js');

router.get('/', (req, res, next) => {
  Users.getUsers(req, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
})

module.exports = router;
