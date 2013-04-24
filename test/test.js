var test = require('tap').test;
var Proxy = require('..');
var net = require('net');

test('Prox', function (t) {
  var cons = 10;
  var max = 5;

  var open = 0;
  var reachedMax = false;

  var server = net.createServer(function (con) {
    open++;
    if (open == max) reachedMax = true;
    t.assert(open <= max, 'connections limited');

    setTimeout(function send () {
      con.end('check');
      open--;
    }, Math.random() * 100);
  });
  server.listen(8080);

  var proxy = Proxy().to(8080).max(max).listen(9090);

  var handled = 0;

  for (var i = 0; i < cons; i++) (function (i) {
    var con = net.connect(9090);
    con.on('data', function (chunk) {
      t.equal(chunk.toString(), 'check', 'right answer');
      if (++handled == cons) {
        t.assert(reachedMax, 'reached max');
        t.equal(open, 0, 'no connections left open');
        server.close();
        proxy.close();
        t.end();
      }
    });
    con.write('hi');
  })(i);
});
