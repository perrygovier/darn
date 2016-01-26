var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var episodes = {};
var unsorted = {};

module.exports = function(req, res) {

  getAllPages().then(function(unsorted) {
    res.json(unsorted);
  });
  //parsePage('show-podcasts', 1).then(function(posts) {
  //  res.json(posts);
  //});
};

getAllPages = function() {
  var promise = new Promise(function(resolve, reject) {;
    getTotalPages('show-podcasts').then(function(numOfPages) {
      console.log('gets here', numOfPages);
      var pagesComplete = 0;
      for (var i = 0; i < parseInt(numOfPages, 10); i++) {
        setTimeout(function() {
          parsePage('show-podcasts', i).then(function(posts, page) {
            pagesComplete++;
            console.log('got page', page);
            unsorted[i] = posts;
            if (pagesComplete > 5) {
              resolve(unsorted);
            }
          });
        }, i * 300);
      };
    });
  });
  return promise;
};

getTotalPages = function(series) {
  var promise = new Promise(function(resolve, reject) {
    var url = 'http://darnwi.com/?series=' + series;
    request(url, function(error, response, html) {
      if (error) {
        return reject(error);
      }
      var $ = cheerio.load(html);
      resolve($('.page-numbers.dots + .page-numbers').text());
    });
  });
  return promise;
};

parsePage = function(series, page) {
  var url = 'http://darnwi.com/?series=' + series + '&paged=' + page;

  var promise = new Promise(function(resolve, reject) {
    request(url, function(error, response, html) {
      if (error) {
        return reject(error);
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
      resolve(audioFiles);
    });
  });
  return promise;
};
