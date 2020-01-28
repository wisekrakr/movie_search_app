import Api from "./config";

$(document).ready(() => {
  $("#searchForm").on("submit", event => {
    event.preventDefault();

    let searchText = $("#searchText").val();
    getMovies(searchText);
  });
});

function getMovies(text) {
  axios
    .get("http://www.omdbapi.com/?s=" + text + "&" + Api.apikey)
    .then(res => {
      let movies = res.data.Search;
      let output = "";

      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}" onclick="movieSelected('${movie.imdbID}')" class="movie-info">
              <h5>${movie.Title}</h5>              
            </div>
          </div>
        `;
      });

      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get("http://www.omdbapi.com/?i=" + movieId + "&" + Api.apikey)
    .then(res => {
      let movie = res.data;

      let output = `
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Director(s):</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer(s):</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Runtime:</strong> ${movie.Runtime}</li>            
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDb Rating:</strong> ${movie.Ratings[0].Value}</li>
            <li class="list-group-item"><strong>RT Rating:</strong> ${movie.Ratings[1].Value}</li>
            <li class="list-group-item"><strong>Metacritic Rating:</strong> ${movie.Ratings[2].Value}</li>
            <li class="list-group-item"><strong>Box Office:</strong> ${movie.BoxOffice}</li>
          </ul>          
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movie.Plot}
          <hr>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View on IMDb</a>
          <a href="index.html" class="btn btn-default">Back to Search</a>
        </div>
      </div>
      `;

      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
