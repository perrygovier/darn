var express     = require('express');
var scrapeCtrl  = require('./scrapeCtrl');

module.exports = function router(app) {

  return new express.Router()

  .get('/', scrapeCtrl);
  // .get('/', function(req, res) {
  //   console.log(scrapeCtrl)
  //   res.send('gets here');
  // });
};
