function search(){
    let title = document.getElementById("movieInput").value
  
    //Get url 1 to access OMDb-API 
    let url1 = "https://www.omdbapi.com/?t="+title+"&apikey=db0da826"
   
    fetch(url1)
        .then(function(response){
            return response.json()
        })

        .then(function(data){
            
            //Plot
            let title = data.Title
            document.getElementById("title").innerHTML = title

            //Plot
            let plot = data.Plot
            document.getElementById("plot").innerHTML = plot

            //Poster
            let poster = data.Poster
            document.getElementById("poster").src = poster

            //imdbID
            let imdbID = data.imdbID

            //Get url 2 to access IMDb-API
            let url2 = "https://imdb-api.com/en/API/Ratings/k_vnngt5ar/"+imdbID
                
                fetch(url2)
                    .then(function(response){
                    return response.json()
                    })

                    .then(function(data){

                    //Rotten Tomatoes
                    let rotten= data.rottenTomatoes
                    document.getElementById("rotten").innerHTML = "Rotten Tomatoes: "+ rotten + "%"
                    })
        })
}
/*var movieList =[]
var searchHistoryList = $('#search-history-list');
var searchmovieInput = $("#search-movie");
var searchmovieButton = $("#search-movie-button");
var clearHistoryButton = $("#clear-history");
movieList =[];
listArray();
$(this).hide("");

searchHistoryList.on("click","li.movie-btn", function(event) {
  var value = $(this).data("value");
  searchHistory(value);
  currentRequest(value);
});

function searchHistory(searchValue) {
  if (searchValue) {
      if (movieList.indexOf(searchValue) === -1) {
          movieList.push(searchValue);

          // List all of the movies in user history
          listArray();
          clearHistoryButton.removeClass("hide");
          movieContent.removeClass("hide");
      } else {
          var removeIndex = movieList.indexOf(searchValue);
          movieList.splice(removeIndex, 1);
          movieList.push(searchValue);

          clearHistoryButton.removeClass("hide");
          movieContent.removeClass("hide");
      }
    }
  }
  function listArray() {
    // Empty out the elements in the sidebar
    searchHistoryList.empty();
    movieList.forEach(function(movie){
        var searchHistoryItem = $('<li class="list-group-item movie-btn">');
        searchHistoryItem.attr("data-value", movie);
        searchHistoryItem.text(movie);
        searchHistoryList.prepend(searchHistoryItem);
    });
    // Update city list history in local storage
    localStorage.setItem("movies", JSON.stringify(movieList));
    
}
function initalizeHistory() {
  if (localStorage.getItem("movies")) {
      movieList = JSON.parse(localStorage.getItem("movies"));
      var lastIndex = movieList.length - 1;
      // console.log(movieList);
      listArray();
      // Display the last movie viewed
      // if page is refreshed
      if (movieList.length !== 0) {
          currentRequest(movieList[lastIndex]);
          movieContent.removeClass("hide");
      }
  }
}

function showClear() {
  if (searchHistoryList.text() !== "") {
      clearHistoryButton.removeClass("hide");
  }
}/*/