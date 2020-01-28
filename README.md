# movie_search_app
An simple app that searches for movies. Works with the OMDb Api and Axios

Search for movies with this simple app. Type a title and get some basic information about a movie.
<br>
You need a OMDB api key 

function getMovies(text) { <br>
  axios<br>
    .get("http://www.omdbapi.com/?s=" + text + "&" + Api.apikey) <<<========= put your key here<br>
    .then(res => {<br>
    
    
