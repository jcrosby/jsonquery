var tests = function($) {

  var collection = [
    {id:1, foo:'bar', rating:3},
    {id:2, foo:'baz', rating:2}
  ];

  jqUnit.test('?name=value', function() {
    var result = JSONQuery("?foo='bar'", collection);
    console.log(result);
    jqUnit.ok(1 == result.length, "A ?name=value query should return the correct number of results");
    jqUnit.ok('bar' == result[0].foo, "A ?name=value query should return the correct object");
  });

}(jQuery);
