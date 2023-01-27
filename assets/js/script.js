var APIKey = "c646bc26";
var youtubeKey = "AIzaSyCtFE4ZvsoVix-qoD9T5Le6AAIkvG3l-Dg";
var userSearch = document.getElementById("search");
var searchButton = document.getElementById("search-button");
var youtubeHTTP = "https://www.youtube.com/watch?v=";
var movieTitle = document.getElementById("movie-title");
var movieYears = document.getElementById("movie-year");
var homeButton = document.getElementById('home-button');
var movieSection = document.querySelector(".movie-container");
var storageArray = JSON.parse(localStorage.getItem('movies')) || [];

function runProgram() {
  var userInput = userSearch.value.trim();
  var currentUrl = "http://www.omdbapi.com/?s=" + userInput + "&apikey=" + APIKey;
  
  // add a modal => inject the frame of the youtube video
  // give the div an id for the movie containers
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
        // localStorage.setItem('movies', JSON.stringify(titles));
        var movieContainer = document.createElement("div");
        var createTitle = document.createElement("a");
        var createYear = document.createElement("h4");
        var createPoster = document.createElement("img");
        var favoriteButton = document.createElement('button');
        favoriteButton.setAttribute('type', 'submit');
        favoriteButton.textContent = "Add to Favorites";
        favoriteButton.addEventListener('click', function(){
          alert('hi');
        })
        if (poster[i] !== "N/A"){
          createPoster.setAttribute("src", poster[i]);
        } else {
          createPoster.setAttribute("src", "https://demofree.sirv.com/nope-not-here.jpg?w=150");
        }
        createTitle.setAttribute("href", "#");
        createTitle.setAttribute("data-attribute", titles[i]);
        createTitle.addEventListener("click", function (event) {
          var userSelection = event.target.getAttribute("data-attribute");
          var updatedSelection = userSelection.replaceAll(' ', '%20');
          var youtubeUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=rating&q=" + updatedSelection + "%20official%20trailer&type=video&key=" + youtubeKey;
          fetch(youtubeUrl)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
                // collect the videoIDs
            });
          console.log(youtubeUrl);
        });
        createTitle.innerHTML = titles[i];
        createYear.innerHTML = years[i];
        movieContainer.append(createTitle, createYear, createPoster, favoriteButton);
        movieSection.appendChild(movieContainer);
      }
    });
}

function refreshPage(){
  location.reload();
}

searchButton.addEventListener("click", runProgram);
homeButton.addEventListener('click', refreshPage);
