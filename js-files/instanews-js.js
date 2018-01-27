//this is the JQuery code that Jim used to animate boxes in his example
// $(".article")
//   .hide()
//   .first()
//   .show("fast", function showNext() {
//     $(this)
//       .next(".article")
//       .show(500, showNext);
//   });




$(".topics-dropdown").change(function () {

  var selection = $(".topics-dropdown").val();

  var url = "https://api.nytimes.com/svc/topstories/v2/" + selection + ".json";

  url += '?' + $.param({
    'api-key': "c5099af9412b4a3eb9e35f2c26f944dd"
  });

  $.ajax({
    url: url,
    method: 'GET',
  })
  
  .done(function (result) {

    console.log(result.results);

    // var filteredResults = result.results.filter()
    var slicedResults = result.results.slice(0, 12);

    console.log(slicedResults);

    $.each(slicedResults, function(key, value){


      $('.headline:eq('+key+')').append(slicedResults[key].title);
    })

  })
  
  .fail(function (err) {
    throw err;
  });
});



