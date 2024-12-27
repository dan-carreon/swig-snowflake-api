const Stores = require('../../models/store.js');

module.exports = {
  getAllStores: (req, res, next) => {
    Stores.getStores((err, data) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.send(data)
      }
    });
  },
}
