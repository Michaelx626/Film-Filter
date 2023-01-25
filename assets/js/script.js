var APIKey = "c646bc26";
var youtubeKey = "AIzaSyCtFE4ZvsoVix-qoD9T5Le6AAIkvG3l-Dg";
var userSearch = document.getElementById("search");
var searchButton = document.getElementById("search-button");
var youtubeHTTP = 'https://www.youtube.com/watch?v=';
var movieTitle = document.getElementById('movie-title');
var movieYears = document.getElementById('movie-year');
var movieContainer = document.getElementById('movie-container');

function runProgram() {
  var userInput = userSearch.value.trim();
  var currentUrl = "http://www.omdbapi.com/?s=" + userInput + "&apikey=" + APIKey;
//   var youtubeUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=rating&q=' + userInput + '&type=video&key=' + youtubeKey;
  fetch(currentUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var movies = data.Search;
      var titles = [];
      var years = [];
      var poster = [];
      for (var i = 0; i < movies.length; i++){
        var filteredTitles = movies[i].Title;
        var filteredYears = movies[i].Year;
        var filteredPoster = movies[i].Poster;
        titles.push(filteredTitles);
        years.push(filteredYears);
        poster.push(filteredPoster);
        var createTitle = document.createElement('h2');
        var createYear = document.createElement('h4');
        var createPoster = document.createElement('img');
        createPoster.setAttribute('src', poster[i]);
        createTitle.innerHTML = titles[i];
        createYear.innerHTML = years[i];
        movieContainer.appendChild(createTitle);
        movieContainer.appendChild(createYear);
        movieContainer.appendChild(createPoster);
      }
    });

    // fetch(youtubeUrl)
    //     .then(function (response){
    //         return response.json()
    //     })
    //     .then(function (data){
    //         console.log(data);
    //     })
}

searchButton.addEventListener("click", runProgram);
