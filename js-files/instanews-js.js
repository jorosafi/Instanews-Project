// Questions for Jim:
// 1) animation appears choppy
// 3) selectric
// 4) Displaying headlines on hover
// 5) 


$(function() {
  $('select').selectric();
});

$('.topics-dropdown').change(function () {

  $('.content').empty();

  $('.loader').fadeIn('fast');
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
    
    // $('.article').css('background', 'black');

    var filteredResults = result.results.filter(function(article){
      return article.multimedia.length
      });

    var slicedResults = filteredResults.slice(0, 12);
    

    $.each(slicedResults, function(key){
      var nytHeadline = slicedResults[key].abstract;
      var nytImg = slicedResults[key].multimedia[4].url; 
      var nytLink =  slicedResults[key].url;
      var html = '';
      html += '<a href="'
      html += nytLink
      html += '" target="_blank" class="article"><p class="headline">'
      html += nytHeadline
      html += '</p></a>'

      console.log(nytImg);

      $('.content').append(html);

      $('.article:eq('+key+')').css({
        'background':'url("'+nytImg+'")', 'background-size': 'cover',
        'background-position': 'center'});
    });

    


    // Animation Jim used as example in class. 
    // $('.article')
    // .hide()
    // .first()
    // .show("fast", function showNext() {
    //   $(this)
    //     .next('.article')
    //     .show('slow', showNext);
    // });
  })



  .fail(function (err) {
    throw err;
  })
  .always(function(){
    $('.loader').hide();
  });
});

// $('.article').hover(function(){
//   $('.headline').fadeIn(100);
//   $('.headline').fadeOut(100);
// });



