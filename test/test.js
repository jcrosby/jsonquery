var tests = function($) {

  var collection = [
    {id:1, foo:'bar', rating:4},
    {id:2, foo:'baz', rating:2}
  ];

  jqUnit.test("?name='value'", function() {
    var result = JSONQuery("?foo='bar'", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(1 == result[0].id, "should return the correct object");
  });

  jqUnit.test("?name=value using a number for comparison", function() {
    var result = JSONQuery("?rating=4", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
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
    var result = JSONQuery("?rating>=2", collection);
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
    var result = JSONQuery("?rating<=5", collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('?name>value when target is greater than value', function() {
    var result = JSONQuery('?rating>3', collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(1 == result[0].id, "should return the correct result");
    var result = JSONQuery('?rating>1', collection);
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
    var result = JSONQuery('?rating<5', collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test("?name != 'value' using a string for comparison", function() {
    var result = JSONQuery("?foo!='bar'", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(2 == result[0].id, "should return the correct result");
    var result = JSONQuery("?foo!='x'", collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results for multiple matches");
  });

  jqUnit.test('?name!=value', function() {
    var result = JSONQuery('?rating!=2', collection);
    jqUnit.ok(1 == result.length, "should return the correct number of result");
    jqUnit.ok(1 == result[0].id, "should return the correct result");
    var result = JSONQuery('?rating!=7', collection);
    jqUnit.ok(2 == result.length, "should return the correct number of results for multiple matches");
  });

}(jQuery);
