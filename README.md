
# Proxector

A TCP proxy that protects services from having too many open connections.

If the number of open connections has been reached, all incoming traffic will
be paused and buffered until it's safe to connect again.

Use this for example in front of a `mysqld`, as node can handle bazillions of
connections but a MySQL server can't.

## Usage

With a service running on port `8080`, start a **Proxector** on port `9090`
that limits the number of open connections the service has to `10`.

```js
var Proxy = require('proxector');

var proxy = Proxy().to(8080).max(10).listen(9090);
```

## API

### Proxector()

Create a new Proxector.

### Proxector#to(port)

Proxy TCP connection to a service running on port `port`.

### Proxector#max(num)

Limit the number of open connections to the proxied service to `num`.
Defaults to `100`.

### Proxector#listen(port)

Make Proxector listen on port `port`.

## Installation

With [npm](http://npmjs.org) do

```bash
$ npm install proxector
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
