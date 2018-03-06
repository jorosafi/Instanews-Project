'use strict';

$(document).ready(function () {

  //this is the event that triggers the Ajax
  $('.topics-dropdown').change(function (event) {
    event.preventDefault();
    $(".content").empty(); //this empties the content section to load new articles
    $('.loader').fadeIn("fast"); // this shows the loading giv
    $('.splash').attr('class', 'container header'); //this changes the class of the header to make it smaller and make room for the articles
    $('.content').css('display', 'flex'); //this makes the content section appear

    var selection = $('.topics-dropdown').val();

    //taken from the NYT API how-to page
    var url = 'https://api.nytimes.com/svc/topstories/v2/' + selection + '.json';
    url += '?' + $.param({
      'api-key': 'c5099af9412b4a3eb9e35f2c26f944dd'
    });

    $.ajax({
      url: url,
      method: 'GET'
    }).done(function (result) {

      //first filter results without images
      var filteredResults = result.results.filter(function (article) {
        return article.multimedia.length;
      });

      //then slice results to limit them to 12
      var slicedResults = filteredResults.slice(0, 12);

      //this each loop appends the NYT articles to the content section
      $.each(slicedResults, function (key) {
        var nytHeadline = slicedResults[key].abstract;
        var nytImg = slicedResults[key].multimedia[4].url;
        var nytLink = slicedResults[key].url;
        var html = '<a href="' + nytLink + '" target="_blank" class="article"><p class="headline">' + nytHeadline + '</p></a>';

        $('.content').append(html);

        $('.article:eq(' + key + ')').css({
          'background': 'url("' + nytImg + '")',
          'background-size': 'cover',
          'background-position': 'center'
        });
      });
    }).fail(function (err) {
      // throw err;
      $('.content').append('Sorry, an error occurred. Please try again later.');
    }).always(function () {
      $('.loader').hide();
    });
  });
});