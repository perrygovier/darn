var express     = require('express');
var scrapeCtrl  = require('./scrapeCtrl');

module.exports = function router(app) {

  return new express.Router()

  .get('/', function(request, response) {
    response.render('index.html');
  })
  .get('/scrape', scrapeCtrl);
};
