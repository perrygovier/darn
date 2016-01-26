var gulp = require('gulp');
var spawn = require('child_process').spawn;
var node;

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
  if (node) {
    node.kill();
  }
  node = spawn('node', ['server.js'], {stdio: 'inherit'});
  node.on('close', function(code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', ['server'], function() {
  gulp.watch(['./server.js', './server/*'], ['server']);
});

// clean up if an error goes unhandled.
process.on('exit', function() {
  if (node) {
    node.kill();
  }
});
