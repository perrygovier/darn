var express = require('express');
var router  = require('./server/router');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

app.use(router(app));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
