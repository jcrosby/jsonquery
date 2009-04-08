var tests = function($) {

  var collection = [
    {id:1, foo:'bar', rating:4},
    {id:2, foo:'baz', rating:2}
  ];

  jqUnit.test("?name='value'", function() {
    var result = JSONQuery("?foo='bar'", collection);
    jqUnit.equals(1, result.length, "should return the correct number of results");
    jqUnit.equals(1, result[0].id, "should return the correct object");
    result = JSONQuery("?foo='x'", collection);
    jqUnit.equals(0, result.length, "should return an empty result if there are no value matches");
    result = JSONQuery("?doesnotexist='x'", collection);
    jqUnit.equals(0, result.length, "should return an emtpy result if there are no property matches");
  });

  jqUnit.test("?name=value using a number for comparison", function() {
    var result = JSONQuery("?rating=4", collection);
    jqUnit.equals(1, result.length, "should return the correct number of results");
    result = JSONQuery("?rating=7", collection);
    jqUnit.equals(0, result.length, "should return an empty result if there are no value matches");
    result = JSONQuery("?x=7", collection);
    jqUnit.equals(0, result.length, "should return an emtpy result if there are no property matches");
  });

  jqUnit.test('?name>=value when value and target are equal', function() {
    var result = JSONQuery("?rating>=4", collection);
    jqUnit.equals(1, result.length, "should return the correct number of results");
    jqUnit.equals(1, result[0].id, "should return the correct result");
  });

  jqUnit.test('?name>=value when target is less than value', function() {
    var result = JSONQuery("?rating>=5", collection);
    jqUnit.equals(0, result.length, "should return an empty result set");
  });

  jqUnit.test('?name>=value when target is greater than value', function() {
    var result = JSONQuery("?rating>=3", collection);
    jqUnit.equals(1, result.length, "should return the correct number of results");
    jqUnit.equals(1, result[0].id, "should return the correct result");
    result = JSONQuery("?rating>=2", collection);
    jqUnit.equals(2, result.length, "should return the correct number of results for mulitple matches");
  });

  jqUnit.test('?name<=value when value and target are equal', function() {
    var result = JSONQuery("?rating<=2", collection);
    jqUnit.equals(1, result.length, "should return the correct number of results");
    jqUnit.equals(2, result[0].id, "should return the correct result");
  });

  jqUnit.test('?name<=value when target is greater than value', function() {
    var result = JSONQuery("?rating<=1", collection);
    jqUnit.equals(0, result.length, "should return an empty result set");
  });

  jqUnit.test('?name<=value when target is less than value', function() {
    var result = JSONQuery("?rating<=3", collection);
    jqUnit.equals(1, result.length, "should return the correct number of results");
    jqUnit.equals(2, result[0].id, "should return the correct result");
    result = JSONQuery("?rating<=5", collection);
    jqUnit.equals(2, result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('?name>value when target is greater than value', function() {
    var result = JSONQuery('?rating>3', collection);
    jqUnit.equals(1, result.length, "should return the correct number of results");
    jqUnit.equals(1, result[0].id, "should return the correct result");
    result = JSONQuery('?rating>1', collection);
    jqUnit.equals(2, result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('?name>value when target is equal to value', function() {
    var result = JSONQuery('?rating>4', collection);
    jqUnit.equals(0, result.length, "should return an empty result set");
  });

  jqUnit.test('?name>value when target is less than value', function() {
    var result = JSONQuery('?rating>5', collection);
    jqUnit.equals(0, result.length, "should return an empty result set");
  });

  jqUnit.test('?name < value when target is greater than value', function() {
    var result = JSONQuery('?rating<2', collection);
    jqUnit.equals(0, result.length, "should return an empty result set");
  });

  jqUnit.test('?name < value when target is equal to value', function() {
    var result = JSONQuery('?rating<2', collection);
    jqUnit.equals(0, result.length, "should return an empty result set");
  });

  jqUnit.test('?name < value when target is less than value', function() {
    var result = JSONQuery('?rating<3', collection);
    jqUnit.equals(1, result.length, "should return the correct number of results");
    jqUnit.equals(2, result[0].id, "should return the correct result");
    result = JSONQuery('?rating<5', collection);
    jqUnit.equals(2, result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test("?name!='value' using a string for comparison", function() {
    var result = JSONQuery("?foo!='bar'", collection);
    jqUnit.equals(1, result.length, "should return the correct number of results");
    jqUnit.equals(2, result[0].id, "should return the correct result");
    result = JSONQuery("?foo!='x'", collection);
    jqUnit.equals(2, result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('?name!=value', function() {
    var result = JSONQuery('?rating!=2', collection);
    jqUnit.equals(1, result.length, "should return the correct number of results");
    jqUnit.equals(1, result[0].id, "should return the correct result");
    result = JSONQuery('?rating!=7', collection);
    jqUnit.equals(2, result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('[/name]', function() {
    var result = JSONQuery('[/rating]', collection);
    jqUnit.equals(2, result.length, "should return the correct number of results");
    jqUnit.equals(2, result[0].id, "should place the lowest value first in the list");
    jqUnit.equals(1, result[1].id, "should place the highest value last in the list");
    result = JSONQuery('[/doesnotexist]', collection);
    jqUnit.equals(collection.length, result.length, "should ignore the sort when the property does not exist");
  });

  jqUnit.test('[\\name]', function() {
    var result = JSONQuery('[\\rating]', collection);
    jqUnit.equals(2, result.length, "should return the correct number of results");
    jqUnit.equals(1, result[0].id, "should place the highest value first in the list");
    jqUnit.equals(2, result[1].id, "should place the lowest value last in the list");
    result = JSONQuery('[\\doesnotexist]', collection);
    jqUnit.equals(collection.length, result.length, "should ignore the sort when the property does not exist");
  });

  jqUnit.test('[=name]', function() {
    var result = JSONQuery('[=foo]', collection);
    jqUnit.equals(2, result.length, "should return the correct number of results");
    jqUnit.equals('bar', result[0], "should extract the named values");
    jqUnit.equals('baz', result[1], "should extract the named values");
    result = JSONQuery('[=doesnotexist]', collection);
    jqUnit.equals(2, result.length, "should return a result for every object in the collection even if there are no matches");
    jqUnit.ok(typeof result[0] === 'undefined', "should return undefined for elements with properties that do not exist");
    jqUnit.ok(typeof result[1] === 'undefined', "should return undefined for elements with properties that do not exist");
  });

  jqUnit.test('[index]', function() {
    var result = [];
    for(var i=0; i<collection.length; i++) {
      result = JSONQuery('['+i+']', collection);
      jqUnit.ok(typeof result.length === 'undefined', "should not return an array");
      jqUnit.equals(i+1, result.id, "should return the correct item");
    }
  });

  jqUnit.test('[start:end]', function() {
    var result = [];
    for(var i=1; i<collection.length; i++) {
      result = JSONQuery('[0:'+i+']', collection);
      jqUnit.equals(i, result.length, "should return the correct number of results");
    }
    result = JSONQuery('[1:2]', collection);
    jqUnit.equals(1, result.length, "should return the correct number of results");
    jqUnit.equals(2, result[0].id, "should use the correct offset");
    result = JSONQuery('[0:]', collection);
    jqUnit.equals(2, result.length, "should default to the max length if no stop is defined");
    result = JSONQuery('[1:]', collection);
    jqUnit.equals(1, result.length, "should default to the max length if no stop is defined");
    result = JSONQuery('[:2]', collection);
    jqUnit.equals(2, result.length, "should default to 0 for the offset");
  });

  jqUnit.test('[start:end:step]', function() {
    var objects = [{id:1},{id:2},{id:3},{id:4}];
    var result = JSONQuery('[0:3:2]', objects);
    jqUnit.equals(2, result.length, "should return the correct number of elements");
    jqUnit.equals(1, result[0].id, "should return the correct first element");
    jqUnit.equals(3, result[1].id, "should return the next element factoring in the step offset");
  });

  jqUnit.test('[expr,expr]', function() {
    
  });

  jqUnit.test('[expr][expr]...', function() {
    var result = JSONQuery('[?id>0][?rating>2]', collection);
    jqUnit.equals(1, result.length, "should return the correct number of results");
    jqUnit.equals(1, result[0].id, "should return the correct result");
  });

  jqUnit.test('+', function() {
    
  });

  jqUnit.test('-', function() {
    
  });

  jqUnit.test('/', function() {
    
  });

  jqUnit.test('*', function() {
    
  });

  jqUnit.test('&', function() {
    
  });

  jqUnit.test('|', function() {
    
  });

  jqUnit.test('%', function() {
    
  });

  jqUnit.test('( and )', function() {
    
  });

  jqUnit.test('accessing the current object with @', function() {
    
  });

  jqUnit.test('accessing the root object wth $', function() {
    
  });

  jqUnit.test('[*]', function() {
    
  });

  jqUnit.test('.*', function() {
    
  });

  jqUnit.test('..property', function() {
    
  });

  jqUnit.test('[={new object literal}]', function() {
    
  });

  jqUnit.test('expr ~ expr', function() {
    
  });

  jqUnit.test('partial string matching with *', function() {
    
  });

  jqUnit.test('$1 $2 etc.', function() {
    
  });

  var sortables = [
    {first:'john',last:'doe'},
    {first:'joe',last:'pass'},
    {first:'alice',last:'doe'}
  ];

  jqUnit.test('[/expr]', function() {
    var result = JSONQuery('[/last]', sortables);
    jqUnit.equals(3, result.length, "should return the correct number of results");
    jqUnit.equals('doe', result[0].last, "should return a correctly ordered result");
    jqUnit.equals('doe', result[1].last, "should return a correctly ordered result");
    jqUnit.equals('pass', result[2].last, "should return a correctly ordered result");
  });

  jqUnit.test('[\\expr]', function() {
    var result = JSONQuery('[\\last]', sortables);
    jqUnit.equals(3, result.length, "should return the correct number of results");
    jqUnit.equals('pass', result[0].last, "should return a correctly ordered result");
    jqUnit.equals('doe', result[1].last, "should return a correctly ordered result");
    jqUnit.equals('doe', result[2].last, "should return a correctly ordered result");
  });

  jqUnit.test('[/expr, /expr]', function() {
    var result = JSONQuery('[/last, /first]', sortables);
    jqUnit.equals(3, result.length, "should return the correct number of results");
    jqUnit.ok(result[0].last == 'doe' && result[0].first == 'alice', "should return a correctly ordered result");
    jqUnit.ok(result[1].last == 'doe' && result[1].first == 'john', "should return a correctly ordered result");
    jqUnit.ok(result[2].last == 'pass' && result[2].first == 'joe', "should return a correctly ordered result");
  });

  jqUnit.test('[/expr, \\expr]', function() {
    var result = JSONQuery('[/last, \\first]', sortables);
    jqUnit.equals(3, result.length, "should return the correct number of results");
    jqUnit.ok(result[0].last == 'doe' && result[0].first == 'john', "should return a correctly ordered result");
    jqUnit.ok(result[1].last == 'doe' && result[1].first == 'alice', "should return a correctly ordered result");
    jqUnit.ok(result[2].last == 'pass' && result[2].first == 'joe', "should return a correctly ordered result");
  });

}(jQuery);
