var APIKey = "c646bc26";
var youtubeKey = "AIzaSyCtFE4ZvsoVix-qoD9T5Le6AAIkvG3l-Dg";
var userSearch = document.getElementById("search");
var searchButton = document.getElementById("search-button");
var youtubeHTTP = "https://www.youtube.com/watch?v=";
var movieTitle = document.getElementById("movie-title");
var movieYears = document.getElementById("movie-year");
var homeButton = document.getElementById('home-button');
var movieResults = document.querySelector('.movieResults')
var youtubeResults = document.querySelector('.youtubeResults')
var movieSection = document.querySelector(".movie-container");
var youtubeSection = document.querySelector(".youtube-container");
var deleteBtn = document.getElementById('delete');
var displayFavorites = document.getElementById('display-favorites');
var userStored = JSON.parse(localStorage.getItem('movies')) || [];

function runProgram(event) {
  event.preventDefault();
  var userInput = userSearch.value.trim();
  var currentUrl = "https://www.omdbapi.com/?s=" + userInput + "&apikey=" + APIKey;
  fetch(currentUrl)
  .then(function (response) {
    return response.json();
  })
  .then(fetchMovieData)
}

function callYoutube (event) {
  youtubeSection.textContent = "Top 5 YouTube Search Results:";
  var userSelection = event.target.getAttribute("data-attribute");
  var updatedSelection = userSelection.replaceAll(' ', '%20');
  var youtubeUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + updatedSelection + "%20official%20trailer&type=video&key=" + youtubeKey;
  fetch(youtubeUrl)
    .then(function (response) {
      return response.json();
    })
  .then(fetchYouTubeData)
}

function fetchMovieData(data){
  console.log(data);
  var movies = data.Search;
  var titles = [];
  var years = [];
  var poster = [];
  deleteExisitingContent();
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
    movieContainer.setAttribute('class', 'movieResults');
    movieContainer.setAttribute('style', 'background-color: white')
    favoriteButton.setAttribute('data-attribute', titles[i]);
    createTitle.setAttribute("href", "#");
    createTitle.setAttribute("data-attribute", titles[i]);
      
    if (poster[i] !== "N/A"){
      createPoster.setAttribute("src", poster[i]);
    } else {
      createPoster.setAttribute("src", "https://demofree.sirv.com/nope-not-here.jpg?w=150");
    }
      
    favoriteButton.addEventListener('click', storeFavorites);
    createTitle.addEventListener("click", callYoutube);
      
    favoriteButton.textContent = "Add to Favorites";
    createTitle.innerHTML = titles[i];
    createYear.innerHTML = years[i];
      
    movieContainer.append(createTitle, createYear, createPoster, favoriteButton);
    movieSection.appendChild(movieContainer);
  }
}
  
function fetchYouTubeData(data){
  console.log(data);
  var videoIDs = data.items;
  var youtubeIDs = [];
  var youtubeResultsTitle = [];
  for (var j = 0; j < videoIDs.length; j++){
    var filteredIDs = videoIDs[j].id.videoId;
    var filteredyoutubeTitles = videoIDs[j].snippet.title;
  
    var youtubeContainer = document.createElement('div');
    var youtubeTitle = document.createElement('h5');
    var youtubeLink = document.createElement('a');
    
    youtubeIDs.push(youtubeHTTP + filteredIDs);
    youtubeResultsTitle.push(filteredyoutubeTitles);

    youtubeContainer.setAttribute('class', 'youtubeResults');
    youtubeLink.setAttribute('href', youtubeIDs[j]);
    youtubeLink.setAttribute('target', '_blank');
  
    youtubeTitle.innerHTML = youtubeResultsTitle[j];
    youtubeLink.innerHTML = youtubeIDs[j];
  
    youtubeContainer.append(youtubeTitle, youtubeLink);
    youtubeSection.appendChild(youtubeContainer);
  }
}
  
function displayFaves(event){
  event.preventDefault();
  deleteExisitingContent();
  for (var k = 0; k < userStored.length; k++){
    var favoriteTitle = document.createElement('a');
    var deleteButton = document.createElement('button');
    var favoriteContainer = document.createElement('div');
      
    favoriteTitle.setAttribute('data-attribute', userStored[k]);
    favoriteTitle.setAttribute('href', '#');
    deleteButton.setAttribute('id', 'delete');
    deleteButton.setAttribute('data-movie-title', userStored[k]);
    deleteButton.setAttribute('type', 'submit');
    favoriteContainer.setAttribute('class', 'fave-container');
    favoriteContainer.setAttribute('style', 'background-color:white');
      
    favoriteTitle.addEventListener('click', callYoutube);
    deleteButton.addEventListener('click', removeFavorites);
      
    deleteButton.textContent = "Delete";
    favoriteTitle.innerHTML = userStored[k];
      
    favoriteContainer.append(favoriteTitle, deleteButton);
    movieSection.appendChild(favoriteContainer);
  }
}

function storeFavorites(event){
  var addFavorite = event.target.getAttribute('data-attribute');
  userStored.push(addFavorite);
  setItem();
}
  
function removeFavorites(event){
  var movieTitle = event.target.getAttribute('data-movie-title');
  var indexToRemove = userStored.indexOf(movieTitle);
  userStored.splice(indexToRemove, 1);
  setItem();
  displayFaves(event);
}
  
function refreshPage(event){
  event.preventDefault();
  deleteExisitingContent();
}

function deleteExisitingContent (){
  movieSection.textContent = "";
  youtubeSection.textContent = "Top 5 YouTube Search Results:";
}
  
function setItem(){
  localStorage.setItem('movies', JSON.stringify(userStored));
}

searchButton.addEventListener("click", runProgram);
homeButton.addEventListener('click', refreshPage);
displayFavorites.addEventListener('click', displayFaves);