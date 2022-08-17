//Select Elements HTML
    const searchInput = document.querySelector('.search-input');
    const searchList = document.querySelector('.search-list');
    const searchResult = document.querySelector('#result');

//First API: OMDB - for movie details

    //API Key
        const apiKey = "eee7f63b";

    //Movie Search
        function movieSearch(movieName) {
            const queryURL = `https://omdbapi.com/?s=${movieName}&page=1&apikey=${apiKey}`
            axios.get(queryURL)
                .then(res => {
                    listMovies(res.data.Search)
                })
                .catch(error => { error })
        };

    // Movie Search Progress
        function movieSearchProgress() {
            let searchTerm = (searchInput.value).trim();
            if (searchTerm.length > 0) {
                searchList.classList.remove('hide-list');
                movieSearch(searchTerm);
            } else {
                searchList.classList.add('hide-list');
            };
        };

    // List Movies
        function listMovies(movies) {
            searchList.innerHTML = "";
            for (let i = 0; i < movies.length; i++) {
                let movieListItem = document.createElement('div');
                movieListItem.dataset.id = movies[i].imdbID;
                movieListItem.classList.add('search-list-item');
                moviePoster = movies[i].Poster;
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

    //Load Movie Details
        function loadMovieDetails() {
            const searchListMovies = searchList.querySelectorAll('.search-list-item');
            searchListMovies.forEach(movie => {
                movie.addEventListener('click', async () => {
                    searchList.classList.add('hide-list');
                    searchInput.value = "";
                    //grab data from omdbapi
                    const res = await axios.get(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${apiKey}`);
                    showMovieDetails(res);
                    //pass movie ID from Omdbapi API to IMDb-API
                    showRottenTomatoes(movie.dataset.id)
                });
            });
        }

    //Show Movie Details
        function showMovieDetails(res) {
            const data = res.data
            searchResult.removeAttribute("style");

            //get movie poster
            const moviePoster = document.querySelector('.movie-poster');
            moviePoster.src = data.Poster

            //get movie title
            const movieTitle = document.querySelector('.movie-title');
            movieTitle.innerHTML = data.Title

            //get movie year
            const MovieYear = document.querySelector('.year');
            MovieYear.innerHTML = `Year:&nbsp${data.Year}`

            //get director
            const director = document.querySelector('.director');
            director.innerHTML = `Director:&nbsp${data.Director}`

            //get movie genre
            const genre = document.querySelector('.genre');
            genre.innerHTML = `Genre:&nbsp${data.Genre}`

            //get writer
            const writer = document.querySelector('.writer');
            writer.innerHTML = `Writer(s):&nbsp${data.Writer}`

            //get actors
            const actors = document.querySelector('.actors');
            actors.innerHTML = `Actors:&nbsp${data.Actors}`

            //get nomination
            const awards = document.querySelector('.awards');
            awards.innerHTML = `Award(s):&nbsp${data.Awards}`

            //get language
            const language = document.querySelector('.language');
            language.innerHTML = `Language(s):&nbsp${data.Language}`

            //get plot
            const plot = document.querySelector('.plot');
            plot.innerHTML = `Plot:&nbsp${data.Plot}`
        };

//Second API: IMDb - Rotten Tomatoes Ratings

    function showRottenTomatoes(movieID) {
        const imdbApi = 'k_vezs1v7k'
        const rottenTomatoesURL = `https://imdb-api.com/en/API/Ratings/${imdbApi}/${movieID}`
        axios.get(rottenTomatoesURL)
            .then(res => {
                //get rotten tomatoes
                const rating = res.data.rottenTomatoes;
                const rottenTomatoesRating = document.querySelector('.rotten-tomatoes-rating')
                rottenTomatoesRating.innerHTML = rating;
                if (rating > 60) {
                    rottenTomatoesRating.style.backgroundColor = 'red'
                }
                else if (!rating) {
                    rottenTomatoesRating.style.backgroundColor = 'transparent'
                    rottenTomatoesRating.innerHTML = 'N/A'
                }
                else {
                    rottenTomatoesRating.style.backgroundColor = 'green'
                }
        })
        .catch(error => { error })
    };
