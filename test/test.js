var tests = function($) {

  var collection = [
    {id:1, foo:'bar', rating:3},
    {id:2, foo:'baz', rating:2}
  ];

  jqUnit.test('?name=value', function() {
    var result = JSONQuery("?foo='bar'", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(1 == result[0].id, "should return the correct object");
  });

  jqUnit.test('?name>=value when name and value are equal', function() {
    var result = JSONQuery("?rating>=3", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(1 == result[0].id, "should return the correct result");
  });

  jqUnit.test('?name<=value when name and value are equal', function() {
    var result = JSONQuery("?rating<=2", collection);
    jqUnit.ok(1 == result.length, "should return the correct number of results");
    jqUnit.ok(2 == result[0].id, "should return the correct result");
  });

}(jQuery);
