var watchListArray = JSON.parse(localStorage.getItem("watchlist-array")) || [];
var watchListAddBtn = $("#watchlist-button");
var watchList = $("#watch-list").text("Add to Watch List");

//function for building the watchlist
function watchlistDisplayer(){
    //Clears the watchlist of values.
    watchList.empty();

    //Creates a new button for each saved array item
    watchListArray.forEach(function(i){
        var watchListBlock = $("<button>").text(i);
        watchList.append(watchListBlock);
        
        //Sends the user to the watchlist item that they saved
        watchListBlock.click(function(){
            movieParam = watchListBlock.val();
            getMovie(movieParam);
        })
    });
}

//Function to save the item to the watchlist when the user clicks the button.
watchListAddBtn.click(function(){
    watchListArray.push(movieName);
    localStorage.setItem("watchlist-array", JSON.stringify(watchListArray));
    watchlistDisplayer();
});

watchlistDisplayer();

// Streaming Availability Fetch
function getMovie(){
    fetch("https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=18&page=1&output_language=en&language=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
            "x-rapidapi-key": "514988ace5msh951fbe99f73764cp120286jsn6ee999bd6cb1"
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);

    // TMDB Fetch
    
    fetch('https://api.themoviedb.org/3/movie/550?api_key=58bc4a862a66afe4f88190b44a8dd8dd')    

    .then(response => response.json())
    .then(data => console.log(data));
    });
}

function mainConstructor(){
    var movieImage = $("<img>").attr("src", _pathToImageSrc);
    var movieTitle = $("<h2>").text(_locationOfFetchedMovieName);
    var movieInfo = $("div").attr("id", "movie-info");
    movieRating = 
}