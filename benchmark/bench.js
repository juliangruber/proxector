var Proxy = require('..');
var net = require('net');

/**
 * Parameters.
 */

var cons = 400;
var max = 50;

/**
 * Run.
 */

function run (title, port, cb) {
  console.log('# %s', title);

  var start = Date.now();
  var handled = 0;

  setTimeout(function () {
    for (var i = 0; i < cons; i++) (function (i) {
      var con = net.connect(9090, function () {
        con.write('hi');
      });
      con.on('data', function (chunk) {
        con.end();
        if (++handled == cons) {
          console.log('%sms for %s connections, %s max\n', Date.now() - start, cons, max);
          if (cb) cb();
        }
      });
      con.on('error', console.error);
    })(i);
  }, 500);
}

run('direct', 8080, function () {
  run('proxy', 9090, function () {});
});
/*run('proxy', 9090, function () {
  run('direct', 8080);
});*/
