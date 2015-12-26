var assert = require('assert');
var util = require('util');

var name = "FLUSHDB";

//assert.strictEqual(null, err, 'result sent back unexpected error: ' + err);
//assert.equal(str, results, label + ' ' + str + ' does not match ' + results);


assert.equal(true, util.isArray([]));
assert.equal(true, util.isArray(new Array(5)));
assert.equal(true, util.isArray(new Array('with', 'some')));
//assert.equal(true, util.isArray({ push: function(){} }));
//assert.equal(true, util.isArray(/regexp/));
//assert.equal(true, util.isArray(new Error));
//assert.equal(true, util.isArray(Object.create(Array.prototype)));

