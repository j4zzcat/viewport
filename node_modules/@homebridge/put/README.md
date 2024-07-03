Put
===

Pack multibyte binary values into buffers with specific endiannesses.

Fork
============

This fork is derived from the original package currently only available via npm: [put](https://www.npmjs.com/package/put).
The [GitHub repo](https://github.com/substack/node-put) seems to be inaccessible.

This fixes a potential Sensitive Data Exposure detailed [here](https://github.com/advisories/GHSA-v6gv-fg46-h89j).

Installation
============

To install with [npm](http://github.com/isaacs/npm):
 
    npm install put

To run the tests with [expresso](http://github.com/visionmedia/expresso):

    expresso

Examples
========

buf.js
------

Build a buffer

    #!/usr/bin/env node

    var Put = require('put');
    var buf = Put()
        .word16be(1337)
        .word8(1)
        .pad(5)
        .put(new Buffer('pow', 'ascii'))
        .word32le(9000)
        .buffer()
    ;
    console.log(buf);

Output:
    <Buffer 05 39 01 00 00 00 00 00 70 6f 77 28 23 00 00>

stream.js
---------

Send a buffer to a writeable stream

    #!/usr/bin/env node

    var Put = require('put');
    Put()
        .word16be(24930)
        .word32le(1717920867)
        .word8(103)
        .write(process.stdout)
    ;

Output:
    abcdefg
