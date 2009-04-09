var tests = function($) {

  var collection = [
    {id:1, foo:'bar', rating:4},
    {id:2, foo:'baz', rating:2}
  ];

  jqUnit.test("?property='value'", function() {
    var result = JSONQuery("?foo='bar'", collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 1, "should return the correct object");
    result = JSONQuery("?foo='x'", collection);
    jqUnit.equals(result.length, 0, "should return an empty result if there are no value matches");
    result = JSONQuery("?doesnotexist='x'", collection);
    jqUnit.equals(result.length, 0, "should return an emtpy result if there are no property matches");
  });

  jqUnit.test("?property=value using a number for comparison", function() {
    var result = JSONQuery("?rating=4", collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    result = JSONQuery("?rating=7", collection);
    jqUnit.equals(result.length, 0, "should return an empty result if there are no value matches");
    result = JSONQuery("?x=7", collection);
    jqUnit.equals(result.length, 0, "should return an emtpy result if there are no property matches");
  });

  jqUnit.test('?property>=value when value and target are equal', function() {
    var result = JSONQuery("?rating>=4", collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 1, "should return the correct result");
  });

  jqUnit.test('?property>=value when target is less than value', function() {
    var result = JSONQuery("?rating>=5", collection);
    jqUnit.equals(result.length, 0, "should return an empty result set");
  });

  jqUnit.test('?property>=value when target is greater than value', function() {
    var result = JSONQuery("?rating>=3", collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 1, "should return the correct result");
    result = JSONQuery("?rating>=2", collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results for mulitple matches");
  });

  jqUnit.test('?property<=value when value and target are equal', function() {
    var result = JSONQuery("?rating<=2", collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 2, "should return the correct result");
  });

  jqUnit.test('?property<=value when target is greater than value', function() {
    var result = JSONQuery("?rating<=1", collection);
    jqUnit.equals(result.length, 0, "should return an empty result set");
  });

  jqUnit.test('?property<=value when target is less than value', function() {
    var result = JSONQuery("?rating<=3", collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 2, "should return the correct result");
    result = JSONQuery("?rating<=5", collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('?property>value when target is greater than value', function() {
    var result = JSONQuery('?rating>3', collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 1, "should return the correct result");
    result = JSONQuery('?rating>1', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('?property>value when target is equal to value', function() {
    var result = JSONQuery('?rating>4', collection);
    jqUnit.equals(result.length, 0, "should return an empty result set");
  });

  jqUnit.test('?property>value when target is less than value', function() {
    var result = JSONQuery('?rating>5', collection);
    jqUnit.equals(result.length, 0, "should return an empty result set");
  });

  jqUnit.test('?property < value when target is greater than value', function() {
    var result = JSONQuery('?rating<2', collection);
    jqUnit.equals(result.length, 0, "should return an empty result set");
  });

  jqUnit.test('?property < value when target is equal to value', function() {
    var result = JSONQuery('?rating<2', collection);
    jqUnit.equals(result.length, 0, "should return an empty result set");
  });

  jqUnit.test('?property < value when target is less than value', function() {
    var result = JSONQuery('?rating<3', collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 2, "should return the correct result");
    result = JSONQuery('?rating<5', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results for multiple matches");
  });

  jqUnit.test("?property!='value' using a string for comparison", function() {
    var result = JSONQuery("?foo!='bar'", collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 2, "should return the correct result");
    result = JSONQuery("?foo!='x'", collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('?property!=value', function() {
    var result = JSONQuery('?rating!=2', collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 1, "should return the correct result");
    result = JSONQuery('?rating!=7', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('value extraction with [=property]', function() {
    var result = JSONQuery('[=foo]', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results");
    jqUnit.equals(result[0], 'bar', "should extract the named values");
    jqUnit.equals(result[1], 'baz', "should extract the named values");
    result = JSONQuery('[=doesnotexist]', collection);
    jqUnit.equals(result.length, 2, "should return a result for every object in the collection even if there are no matches");
    jqUnit.ok(typeof result[0] === 'undefined', "should return undefined for elements with properties that do not exist");
    jqUnit.ok(typeof result[1] === 'undefined', "should return undefined for elements with properties that do not exist");
  });

  jqUnit.test('[index]', function() {
    var result = [];
    for(var i=0; i<collection.length; i++) {
      result = JSONQuery('['+i+']', collection);
      jqUnit.ok(typeof result.length === 'undefined', "should not return an array");
      jqUnit.equals(result.id, i+1, "should return the correct item");
    }
  });

  jqUnit.test('array slicing with [start:end]', function() {
    var result = [];
    for(var i=1; i<collection.length; i++) {
      result = JSONQuery('[0:'+i+']', collection);
      jqUnit.equals(result.length, i, "should return the correct number of results");
    }
    result = JSONQuery('[1:2]', collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 2, "should use the correct offset");
    result = JSONQuery('[0:]', collection);
    jqUnit.equals(result.length, 2, "should default to the max length if no stop is defined");
    result = JSONQuery('[1:]', collection);
    jqUnit.equals(result.length, 1, "should default to the max length if no stop is defined");
    result = JSONQuery('[:2]', collection);
    jqUnit.equals(result.length, 2, "should default to 0 for the offset");
  });

  jqUnit.test('array slicing with [start:end:step]', function() {
    var objects = [{id:1},{id:2},{id:3},{id:4}];
    var result = JSONQuery('[0:3:2]', objects);
    jqUnit.equals(result.length, 2, "should return the correct number of elements");
    jqUnit.equals(result[0].id, 1, "should return the correct first element");
    jqUnit.equals(result[1].id, 3, "should return the next element factoring in the step offset");
  });

  jqUnit.test('unions with [expr,expr]', function() {
    var result = JSONQuery("[?foo='bar',rating=4]", collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 1, "should return the correct result");
  });

  jqUnit.test('filter chaining with [expr][expr]...', function() {
    var result = JSONQuery('[?id>0][?rating>2]', collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 1, "should return the correct result");
  });

  jqUnit.test('+', function() {
    var result = JSONQuery('[=id+1]', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<collection.length; i++) {
      jqUnit.equals(result[i], i+2, "should return the correct result");
    }
  });

  jqUnit.test('-', function() {
    var result = JSONQuery('[=id-1]', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<collection.length; i++) {
      jqUnit.equals(result[i], i, "should return the correct result");
    }
  });

  jqUnit.test('/', function() {
    var result = JSONQuery('[=id/1]', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<collection.length; i++) {
      jqUnit.equals(result[i], i+1, "should return the correct result");
    }
  });

  jqUnit.test('*', function() {
    var result = JSONQuery('[=id*2]', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<collection.length; i++) {
      jqUnit.equals(result[i], (i+1)*2, "should return the correct result");
    }
  });

  jqUnit.test('bitwise AND with &', function() {
    var result = JSONQuery('[=foo&3]', [{foo:10}]);
    jqUnit.equals(result[0], 2, "should return the correct result");
  });

  jqUnit.test('bitwise OR with |', function() {
    var result = JSONQuery('[=foo|3]', [{foo:10}]);
    jqUnit.equals(result[0], 11, "should return the correct result");
  });

  jqUnit.test('%', function() {
    var result = JSONQuery('[=5%id]', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results");
    jqUnit.equals(result[1], 1, "should return the correct result");
  });

  jqUnit.test('( and )', function() {
    var result = JSONQuery('[=(id+1)*2]', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results");
    jqUnit.equals(result[0], 4, "should return the correct result");
    jqUnit.equals(result[1], 6, "should return the correct result");
  });

  jqUnit.test('accessing the current object with @', function() {
    var result = JSONQuery("[?@.rating=4]", collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].foo, 'bar', "should return the correct result");
  });

  jqUnit.test('accessing the root object with $', function() {
    var result = JSONQuery("$[?rating=4]", collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].foo, 'bar', "should return the correct result");
  });

  jqUnit.test('accessing all properties with [*]', function() {
    var result = JSONQuery('[*]', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<collection.length; i++) {
      jqUnit.equals(result[i].id, i+1, "should return the correct result");
      jqUnit.ok(result[i].hasOwnProperty('foo'), "should include the foo property");
      jqUnit.ok(result[i].hasOwnProperty('rating'), "should include the rating property");
    }
  });

  jqUnit.test('accessing all properties with .*', function() {
    var result = JSONQuery('.*', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<collection.length; i++) {
      jqUnit.equals(result[i].id, i+1, "should return the correct result");
      jqUnit.ok(result[i].hasOwnProperty('foo'), "should include the foo property");
      jqUnit.ok(result[i].hasOwnProperty('rating'), "should include the rating property");
    }
  });

  jqUnit.test('recursive find with ..property', function() {
    var nested = [
      {id:1,number:1},
      {id:2,foo:3,inside:{number:2}},
      {id:3,foo:4,inside:{bar:[{number:3}]}}
    ];
    var result = JSONQuery('..number', nested);
    jqUnit.equals(result.length, 3, "should return the correct number of results");
    for(var i=0; i<nested.length; i++) {
      jqUnit.equals(result[i], i+1, "should find the nested property");
    }
  });

  jqUnit.test('creating new object literals with [={new object literal}]', function() {
    var result = JSONQuery('[={x:id}]', collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results");
    for(var i=0; i<collection.length; i++) {
      jqUnit.equals(result[i].x, i+1, "should return the correct result");
    }
  });

  jqUnit.test('case insensitive matching with [expr ~ expr]', function() {
    var result = JSONQuery("[?foo~'BAR']", collection);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 1, "should return the correct result");
  });

  jqUnit.test('partial string matching with *', function() {
    var result = JSONQuery("?foo='ba*'", collection);
    jqUnit.equals(result.length, 2, "should return the correct number of results");
  });

  jqUnit.test('value substitution with $1 $2 etc.', function() {
    var result = JSONQuery("[?foo=$1,rating=$2]", collection, 'bar', 4);
    jqUnit.equals(result.length, 1, "should return the correct number of results");
    jqUnit.equals(result[0].id, 1, "should return the correct result");
  });

  var sortables = [
    {first:'john',last:'doe'},
    {first:'joe',last:'pass'},
    {first:'alice',last:'doe'}
  ];

  jqUnit.test('ascending sort with [/expr]', function() {
    var result = JSONQuery('[/last]', sortables);
    jqUnit.equals(result.length, 3, "should return the correct number of results");
    jqUnit.equals(result[0].last, 'doe', "should return a correctly ordered result");
    jqUnit.equals(result[1].last, 'doe', "should return a correctly ordered result");
    jqUnit.equals(result[2].last, 'pass', "should return a correctly ordered result");
    result = JSONQuery('[/doesnotexist]', collection);
    jqUnit.equals(collection.length, result.length, "should ignore the sort when the property does not exist");
  });

  jqUnit.test('descending sort with [\\expr]', function() {
    var result = JSONQuery('[\\last]', sortables);
    jqUnit.equals(result.length, 3, "should return the correct number of results");
    jqUnit.equals(result[0].last, 'pass', "should return a correctly ordered result");
    jqUnit.equals(result[1].last, 'doe', "should return a correctly ordered result");
    jqUnit.equals(result[2].last, 'doe', "should return a correctly ordered result");
    result = JSONQuery('[\\doesnotexist]', collection);
    jqUnit.equals(result.length, collection.length, "should ignore the sort when the property does not exist");
  });

  jqUnit.test('prioritized sorting with [/expr, /expr]', function() {
    var result = JSONQuery('[/last, /first]', sortables);
    jqUnit.equals(result.length, 3, "should return the correct number of results");
    jqUnit.ok(result[0].last == 'doe' && result[0].first == 'alice', "should return a correctly ordered result");
    jqUnit.ok(result[1].last == 'doe' && result[1].first == 'john', "should return a correctly ordered result");
    jqUnit.ok(result[2].last == 'pass' && result[2].first == 'joe', "should return a correctly ordered result");
  });

  jqUnit.test('mixed direction, prioritized sorting with [/expr, \\expr]', function() {
    var result = JSONQuery('[/last, \\first]', sortables);
    jqUnit.equals(result.length, 3, "should return the correct number of results");
    jqUnit.ok(result[0].last == 'doe' && result[0].first == 'john', "should return a correctly ordered result");
    jqUnit.ok(result[1].last == 'doe' && result[1].first == 'alice', "should return a correctly ordered result");
    jqUnit.ok(result[2].last == 'pass' && result[2].first == 'joe', "should return a correctly ordered result");
  });

}(jQuery);
