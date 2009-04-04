var tests = function($) {

  var collection = [
    {foo:'bar'}
  ];

  jqUnit.test('?name=value', function() {
    var result = JSONQuery("?foo='bar'", collection);
    console.log(result);
    jqUnit.ok(1 == result.length, "A ?name=value query should return the correct number of results");
    jqUnit.ok('bar' == result[0].foo, "A ?name=value query should return the correct object");
  });

}(jQuery);
