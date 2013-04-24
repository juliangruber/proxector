var net = require('net');

/**
 * Server.
 */

var server = net.createServer(function (con) {
  con.on('data', function () { con.end('ok') });
});

server.listen(8080);
