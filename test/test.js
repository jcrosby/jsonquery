var tests = function($) {

  var collection = [
    {id:1, foo:'bar', rating:4},
    {id:2, foo:'baz', rating:2}
  ];

  jqUnit.test("?name='value'", function() {
    var result = JSONQuery("?foo='bar'", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(1 == result[0].id, "should return the correct object");
    result = JSONQuery("?foo='x'", collection);
    jqUnit.ok(0 == result.length, "should return an empty result if there are no value matches");
    result = JSONQuery("?doesnotexist='x'", collection);
    jqUnit.ok(0 == result.length, "should return an emtpy result if there are no property matches");
  });

  jqUnit.test("?name=value using a number for comparison", function() {
    var result = JSONQuery("?rating=4", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    result = JSONQuery("?rating=7", collection);
    jqUnit.ok(0 == result.length, "should return an empty result if there are no value matches");
    result = JSONQuery("?x=7", collection);
    jqUnit.ok(0 == result.length, "should return an emtpy result if there are no property matches");
  });

  jqUnit.test('?name>=value when value and target are equal', function() {
    var result = JSONQuery("?rating>=4", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(1 == result[0].id, "should return the correct result");
  });

  jqUnit.test('?name>=value when target is less than value', function() {
    var result = JSONQuery("?rating>=5", collection);
    jqUnit.ok(0 == result.length, "should return an empty result set");
  });

  jqUnit.test('?name>=value when target is greater than value', function() {
    var result = JSONQuery("?rating>=3", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(1 == result[0].id, "should return the correct result");
    result = JSONQuery("?rating>=2", collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results for mulitple matches");
  });

  jqUnit.test('?name<=value when value and target are equal', function() {
    var result = JSONQuery("?rating<=2", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(2 == result[0].id, "should return the correct result");
  });

  jqUnit.test('?name<=value when target is greater than value', function() {
    var result = JSONQuery("?rating<=1", collection);
    jqUnit.ok(0 == result.length, "should return an empty result set");
  });

  jqUnit.test('?name<=value when target is less than value', function() {
    var result = JSONQuery("?rating<=3", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(2 == result[0].id, "should return the correct result");
    result = JSONQuery("?rating<=5", collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('?name>value when target is greater than value', function() {
    var result = JSONQuery('?rating>3', collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(1 == result[0].id, "should return the correct result");
    result = JSONQuery('?rating>1', collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('?name>value when target is equal to value', function() {
    var result = JSONQuery('?rating>4', collection);
    jqUnit.ok(0 == result.length, "should return an empty result set");
  });

  jqUnit.test('?name>value when target is less than value', function() {
    var result = JSONQuery('?rating>5', collection);
    jqUnit.ok(0 == result.length, "should return an empty result set");
  });

  jqUnit.test('?name < value when target is greater than value', function() {
    var result = JSONQuery('?rating<2', collection);
    jqUnit.ok(0 == result.length, "should return an empty result set");
  });

  jqUnit.test('?name < value when target is equal to value', function() {
    var result = JSONQuery('?rating<2', collection);
    jqUnit.ok(0 == result.length, "should return an empty result set");
  });

  jqUnit.test('?name < value when target is less than value', function() {
    var result = JSONQuery('?rating<3', collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(2 == result[0].id, "should return the correct result");
    result = JSONQuery('?rating<5', collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test("?name!='value' using a string for comparison", function() {
    var result = JSONQuery("?foo!='bar'", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(2 == result[0].id, "should return the correct result");
    result = JSONQuery("?foo!='x'", collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('?name!=value', function() {
    var result = JSONQuery('?rating!=2', collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(1 == result[0].id, "should return the correct result");
    result = JSONQuery('?rating!=7', collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('[/name]', function() {
    var result = JSONQuery('[/rating]', collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results");
    jqUnit.ok(2 == result[0].id, "should place the lowest value first in the list");
    jqUnit.ok(1 == result[1].id, "should place the highest value last in the list");
    result = JSONQuery('[/doesnotexist]', collection);
    jqUnit.ok(collection.length == result.length, "should ignore the sort when the property does not exist");
  });

  jqUnit.test('[\\name]', function() {
    var result = JSONQuery('[\\rating]', collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results");
    jqUnit.ok(1 == result[0].id, "should place the highest value first in the list");
    jqUnit.ok(2 == result[1].id, "should place the lowest value last in the list");
    result = JSONQuery('[\\doesnotexist]', collection);
    jqUnit.ok(collection.length == result.length, "should ignore the sort when the property does not exist");
  });

  jqUnit.test('[=name]', function() {
    var result = JSONQuery('[=foo]', collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results");
    jqUnit.ok('bar' == result[0], "should extract the named values");
    jqUnit.ok('baz' == result[1], "should extract the named values");
    result = JSONQuery('[=doesnotexist]', collection);
    jqUnit.ok(2 == result.length, "should return a result for every object in the collection even if there are no matches");
    jqUnit.ok(typeof result[0] === 'undefined', "should return undefined for elements with properties that do not exist");
    jqUnit.ok(typeof result[1] === 'undefined', "should return undefined for elements with properties that do not exist");
  });

  jqUnit.test('[start:length]', function() {
    var result = JSONQuery('[0:1]', collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    result = JSONQuery('[0:2]', collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results");
    result = JSONQuery('[1:2]', collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(2 == result[0].id, "should use the correct offset");
    result = JSONQuery('[0:]', collection);
    jqUnit.ok(2 == result.length, "should default to the max length if no stop is defined");
    result = JSONQuery('[1:]', collection);
    jqUnit.ok(1 == result.length, "should default to the max length if no stop is defined");
    result = JSONQuery('[:2]', collection);
    jqUnit.ok(2 == result.length, "should default to 0 for the offset");
  });

}(jQuery);
