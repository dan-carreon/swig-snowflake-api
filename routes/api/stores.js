const express = require('express');
const router = express.Router();
const Stores = require('../../models/store.js');

router.get('/', (req, res, next) => {
  Stores.getStores(req, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data)
    }
  });
})

module.exports = router;
