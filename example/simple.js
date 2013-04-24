var Proxy = require('..');
var net = require('net');

var open = 0;
net.createServer(function (con) {
  con.on('data', 
  console.log('open: %s', ++open);
  setTimeout(function () {
    con.end('ok');
    console.log('open: %s', --open);
  }, Math.random() * 3000);
}).listen(8080);

var proxy = Proxy().to(8080).max(10).listen(9090);

var handled = 0;

for (var i = 0; i < 50; i++) (function (i) {
  var con = net.connect(9090);
  con.on('data', function (chunk) {
    console.log('%s : %s', ++handled, chunk.toString());
  });
})(i);
