var Proxy = require('..');

/**
 * Proxy.
 */

var proxy = Proxy().to(8080).max(300).listen(9090);
