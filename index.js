var net = require('net');
var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var debug = require('debug')('prox');

module.exports = Prox;

function Prox () {
  if (!(this instanceof Prox)) return new Prox();

  EventEmitter.call(this);

  this.dest = null;
  this._max = 100;
  this.active = [];
  this.waiting = [];
  this.server = null;
}

inherits(Prox, EventEmitter);

Prox.prototype.to = function (dest) {
  debug('destination: %s', dest);

  this.dest = dest;
  return this;
}

Prox.prototype.max = function (max) {
  debug('max connections: %s', max);

  this._max = max;
  return this;
}

Prox.prototype.handle = function (con) {
  var prox = this;

  debug('active: %s, queue: %s', prox.active.length, prox.waiting.length);

  if (prox.active.length >= prox._max) {
    prox.waiting.push(con);
    con.pause();

    debug('queue (length: %s)', prox.waiting.length);

    return;
  }

  prox.active.push(con);

  debug('connect (connections: %s)', prox.active.length);

  var sock = net.connect(prox.dest);
  sock.on('error', onerror);

  con.pipe(sock).pipe(con);
 
  con.on('close', next);
  con.on('error', onerror);

  con.resume();

  function onerror (err) {
    console.error(err);
    next();
  }

  function next () {
    prox.active.splice(prox.active.indexOf(con), 1);

    debug('close (connections: %s)', prox.active.length);

    if (prox.waiting.length) prox.handle(prox.waiting.shift());
  }
}

Prox.prototype.listen = function (port) {
  var prox = this;

  if (prox.server) throw new Error('already listening');

  prox.server = net.createServer(function (con) {
    prox.handle(con);
  }).listen(port);

  return prox;
}

Prox.prototype.close = function () {
  if (!this.server) throw new Error('not listening');
  this.server.close();

  return this;
}
