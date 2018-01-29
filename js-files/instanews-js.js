//this is the JQuery code that Jim used to animate boxes in his example
// $(".article")
//   .hide()
//   .first()
//   .show("fast", function showNext() {
//     $(this)
//       .next(".article")
//       .show(500, showNext);
//   });

$('.topics-dropdown').change(function () {
  $('.splash').attr('class', 'container header');
  $('.content').css('display','flex');

  var selection = $('.topics-dropdown').val();

  var url = 'https://api.nytimes.com/svc/topstories/v2/' + selection + '.json';

  url += '?' + $.param({
    'api-key': 'c5099af9412b4a3eb9e35f2c26f944dd'
  });

  $.ajax({
    url: url,
    method: 'GET',
  })
  
  .done(function (result) {

    $('.content').empty();
    $('.article').css('background', 'black');

    var filteredResults = result.results.filter(function(article){
      return article.multimedia.length
      })

    var slicedResults = filteredResults.slice(0, 12);
    

    $.each(slicedResults, function(key, value){
      var nytHeadline = slicedResults[key].abstract;
      var nytImg = slicedResults[key].multimedia[4].url; 
      var nytLink =  slicedResults[key].url;
      var html = '';
      html += '<a href="'
      html += nytLink
      html += '" target="_blank" class="article"><p class="headline">'
      html += nytHeadline
      html += '</p></a>'
      html +=
      html +=
      html +=

      $('.content').append(html);

      $('.article:eq('+key+')').css({
        'background':'url("'+nytImg+'")', 'background-size': 'cover',
        'background-position': 'center'});
      
    })

  })
  
  .fail(function (err) {
    throw err;
  });
});



