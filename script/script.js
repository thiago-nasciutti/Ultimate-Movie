const searchInput = document.querySelector('.search-input');
const searchList = document.querySelector('.search-list');
const searchResult = document.querySelector('.result');
const apiKey = "eee7f63b";

function movieSearch(movieName) {
    const queryURL = `https://omdbapi.com/?s=${movieName}&page=1&apikey=${apiKey}`
    axios.get(queryURL)
        .then(res => {
            listMovies(res.data.Search)
        })
        .catch(error => { error })
};

function movieSearchProgress() {
    let searchTerm = (searchInput.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-list');
        movieSearch(searchTerm);
    } else {
        searchList.classList.add('hide-list');
    };
};

function listMovies(movies) {
    searchList.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID;
        movieListItem.classList.add('search-list-item');
        if (movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
            <div class = "search-item-thumbnail">
                <img src = "${moviePoster}">
            </div>
            <div class = "search-item-info">
                <h3>${movies[i].Title}</h3>
                <p>${movies[i].Year}</p>
            </div>
            `;

        searchList.appendChild(movieListItem);
    }
    loadMovieDetails()
}

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-list');
            searchInput.value = "";
            const res = await axios.get(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${apiKey}`);
            showMovieDetails(res);

        });
    });
}

function showMovieDetails(res) {
    const data = res.data
    searchResult.removeAttribute("style");
    searchResult.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(data.Poster != "N/A") ? data.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${data.Title}</h3>
        <p class = "year"><br>Year:&nbsp${data.Year}</p>
        <p class = "rated"><br>Rating:&nbsp${data.Rated}</p>
        <p class = "released"><br>Released:&nbsp${data.Released}</p>
        <p class = "genre"><br>Genre:&nbsp${data.Genre}</p>
        <p class = "writer"><br>Writer:&nbsp${data.Writer}</p>
        <p class = "actors"><br>Actors:&nbsp${data.Actors}</p>
        <p class = "plot"><br>Plot:&nbsp${data.Plot}</p>
        <p class = "language"><br>Language:&nbsp${data.Language}</p>
    </div>
    `;
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