var APIKey = "c646bc26";
var youtubeKey = "AIzaSyCtFE4ZvsoVix-qoD9T5Le6AAIkvG3l-Dg";
var userSearch = document.getElementById("search");
var searchButton = document.getElementById("search-button");
var youtubeHTTP = 'https://www.youtube.com/watch?v=';

function runProgram() {
  var userInput = userSearch.value.trim();
  var currentUrl = "http://www.omdbapi.com/?s=" + userInput + "&apikey=" + APIKey;
  var youtubeUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=rating&q=' + userInput + '&type=video&key=' + youtubeKey;
  fetch(currentUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });

    fetch(youtubeUrl)
        .then(function (response){
            return response.json()
        })
        .then(function (data){
            console.log(data);
        })
}

searchButton.addEventListener("click", runProgram);
