var util = require('util');

module.exports = {
  'Test 1' : function(test) {
    // 테스트 개수
    test.expect(4);

    test.equal(true, util.isArray([]));
    test.equal(true, util.isArray(new Array(3)));
    test.equal(true, util.isArray([1, 2, 3]));
    test.notEqual(true, (1 > 2));

    // 끝.
    test.done();
  },
  'Test 2' : function(test) {
    // 테스트 개수
    test.expect(2);
  
    test.deepEqual([1, 2, 3], [1, 2, 3]);
    test.ok('str' === 'str', 'equal');
    
    test.done();
  }
};
