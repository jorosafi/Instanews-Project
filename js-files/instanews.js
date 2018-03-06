
$(document).ready(function() {

    //this is the event that triggers the Ajax
  $('.topics-dropdown').change(function(event) {
    event.preventDefault();
    $(".content").empty(); //this empties the content section to load new articles
    $('.loader').fadeIn("fast"); // this shows the loading giv
    $('.splash').attr('class', 'container header'); //this changes the class of the header to make it smaller and make room for the articles
    $('.content').css('display', 'flex'); //this makes the content section appear

    let selection = $('.topics-dropdown').val();

    //taken from the NYT API how-to page
    let url = `https://api.nytimes.com/svc/topstories/v2/${selection}.json`;
    url +=
      '?' +
      $.param({
        'api-key': 'c5099af9412b4a3eb9e35f2c26f944dd'
      });

    $.ajax({
      url: url,
      method: 'GET'
    })

    .done(function(result) {

        //first filter results without images
        const filteredResults = result.results.filter((article) => {
          return article.multimedia.length;
        });

        //then slice results to limit them to 12
        let slicedResults = filteredResults.slice(0, 12);

        //this each loop appends the NYT articles to the content section
        $.each(slicedResults, (key) => {
          let nytHeadline = slicedResults[key].abstract;
          let nytImg = slicedResults[key].multimedia[4].url;
          let nytLink = slicedResults[key].url;
          let html = `<a href="${nytLink}" target="_blank" class="article"><p class="headline">${nytHeadline}</p></a>`

          $('.content').append(html);

          $(`.article:eq(${key})`).css({
            'background': `url("${nytImg}")`,
            'background-size': 'cover',
            'background-position': 'center'
          });
        });
      })

    .fail((err) => {
        // throw err;
        $('.content').append('Sorry, an error occurred. Please try again later.');
      })

    .always(() => {
        $('.loader').hide();
      });
  });

});