var APIKey = "c646bc26";
var youtubeKey = "AIzaSyCtFE4ZvsoVix-qoD9T5Le6AAIkvG3l-Dg";
var userSearch = document.getElementById("search");
var searchButton = document.getElementById("search-button");
var youtubeHTTP = "https://www.youtube.com/watch?v=";
var movieTitle = document.getElementById("movie-title");
var movieYears = document.getElementById("movie-year");
var movieSection = document.querySelector(".movie-container");

function runProgram() {
  var userInput = userSearch.value.trim();
  var currentUrl =
    "http://www.omdbapi.com/?s=" + userInput + "&apikey=" + APIKey;
  var youtubeUrl =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=rating&q=" +
    userInput +
    "%20official%20trailer&type=video&key=" +
    youtubeKey;
  // add a modal => inject the frame of the youtube video
  // give the div an id for the movie containers
  // event listener for all movies; querySelectorAll('...')
  // trigger the modal dialog => add in the content will be dynamic => make the call to youtube with the youtube ID (after)
  // extract the youtube title and append it to URL
  // iFrame => source => youtube http + videoID

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
      for (var i = 0; i < movies.length; i++) {
        var filteredTitles = movies[i].Title;
        var filteredYears = movies[i].Year;
        var filteredPoster = movies[i].Poster;
        titles.push(filteredTitles);
        years.push(filteredYears);
        poster.push(filteredPoster);
        var movieContainer = document.createElement("div");
        var createTitle = document.createElement("a");
        var createYear = document.createElement("h4");
        var createPoster = document.createElement("img");
        var favoriteButton = document.createElement('button');
        favoriteButton.setAttribute('type', 'submit');
        favoriteButton.textContent = "Add to Favorites";
        favoriteButton.addEventListener('click', function(){
            // localStorage.setItem('movie', title[i]);
        })
        createPoster.setAttribute("src", poster[i]);
        createTitle.setAttribute("href", "#");
        createTitle.setAttribute("data-attribute", titles[i]);
        createTitle.addEventListener("click", function (event) {
          event.target.getAttribute("data-attribute") == titles[i];
          fetch(youtubeUrl)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
                // collect the videoIDs
            });
        });
        createTitle.innerHTML = titles[i];
        createYear.innerHTML = years[i];
        movieContainer.append(createTitle, createYear, createPoster, favoriteButton);
        movieSection.appendChild(movieContainer);
      }
    });
}

searchButton.addEventListener("click", runProgram);
