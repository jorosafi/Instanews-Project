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
  }).done(function (result) {

    console.log(result.results);

    $.each(result, function(key, value){

      var articleIndex = 0;
      articleIndex ++

      $('.headline').append(result.results[articleIndex].title)
        .next('.headline');
    })

  }).fail(function (err) {
    throw err;
  });
});



