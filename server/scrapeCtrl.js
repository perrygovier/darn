var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var episodes = {};

module.exports = function(req, res) {

  return res.send(parsePage('show-podcasts', 1));

};

getTotalPages = function(series) {
  var url = 'http://darnwi.com/?series=' + series;

  request(url, function(error, response, html) {
    if (error) {
      return;
    }
    var $ = cheerio.load(html);
    return $('.page-numbers.dots + .page-numbers').text();
  });

parsePage = function(series, page) {
  var url = 'http://darnwi.com/?series=' + series + '&paged=' + page;

  request(url, function(error, response, html) {
    if (error) {
      return;
    }
    var $ = cheerio.load(html);
    var audioFiles = [];

    $article = $('#content article');

    $article.each(function(index, el) {
      audioFiles.push({
        file: $(el).find('audio a').attr('href'),
        title: $(el).find('.entry-header h1 a').text(),
        description: $(el).find('.entry-content p').text()
      });
    });

    console.log(audioFiles);
    return audioFiles;
  });
};
