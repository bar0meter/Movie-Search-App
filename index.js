$(document).ready(function() {
  let movieSearch = [];
  $('#search-btn').on('click', function(e) {
    const search = $('#search-txt')
      .val()
      .toLowerCase();
    if (!search) {
      alert('Movie name cannot be empty');
      return;
    }
    $.preloader.start({
      modal: true
    });
    setTimeout(function getData() {
      $.get(
        `https://api.themoviedb.org/3/search/movie?api_key=8510809699ccd9f76502202b7674a91a&query=${search}`,
        function(res) {
          $.preloader.stop();
          $('#search-txt').val('');
          let results = '';
          movieSearch = res.results;
          for (let x of res.results) {
            results += `
            <div class="movieItem">
            <div class="movieTitle">${x['original_title']}</div>
            <div class="moreDetails-btn">
              <a type="button" class="showDetails">
                <span><i class="fas fa-arrow-circle-right" id="showDetails-${
                  x.id
                }"></i></span>
              </a>
            </div>
          </div>
            `;
          }
          $('.movieName').html(results);
        }
      );
    }, 1000);
  });

  $('.movieName').on('click', '.showDetails', function(e) {
    const id = parseInt(e.target.id.split('-')[1]);
    const index = movieSearch.findIndex(x => x.id === id);
    const movie = movieSearch[index];
    const image = `<img src="http://image.tmdb.org/t/p/w185//${
      movie['poster_path']
    }" />`;
    $('.moviePoster').html(image);

    const movieStats = `
      <div class="titleMovie">${movie['original_title']}</div>
      <div>Average Rating: ${movie['vote_average']}</div>
      <div>Release Date: ${movie['release_date']}</div>
    `;
    $('.movieStats').html(movieStats);

    const movieSummary = `
      <div class="overview">
        ${movie['overview']}
      </div>
    `;
    $('.movieSummary').html(movieSummary);
  });
});
