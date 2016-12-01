var proxy = require('express-http-proxy');
var app = require('express')();

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});
app.use('/', proxy('http://darnwi.com'));


var port = process.env.PORT || 8200;
app.listen(port);
