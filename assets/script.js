var watchListArray = JSON.parse(localStorage.getItem("watchlist-array")) || [];
//var watchListAddBtn = $("#watchlist-button");
var watchList = $("#watch-list");
var watchListAddBtn = $("#watchlist-button");
var watchList = $("#watch-list").text("Add to Watch List");
var slideBtn = $(".slide-panel").children("i");
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

// Calvin's section start
//global movie Id
var movieId;
function streamingAvailabilityFetch(){
    $("#streaming-options").empty();
    //TO DO: Need to pull movie ID from Eric's fetch, set as variable and use variable to initiate streaming fetch.
    // Streaming Availability Fetch // Note that "120" in the fetch URL is a placeholder for the movie name (user input variable) 
    fetch("https://streaming-availability.p.rapidapi.com/get/basic?country=us&tmdb_id=movie/" + movieId + "&output_language=en", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
		    "x-rapidapi-key": "514988ace5msh951fbe99f73764cp120286jsn6ee999bd6cb1"
	    }
    })
    //Converts response to JSON
    .then(response => {
        return response.json();
    })
    // Start function
    .then(data => {
        // Display "Streaming Options" Header
        var streamOptionsTitle = document.createElement('h1');
        streamOptionsTitle.setAttribute("id", "streaming-options-header");
        streamOptionsTitle.textContent = "Streaming Options for " + data.originalTitle;
        var streamingOptionsArea = document.querySelector("#streaming-options");
        streamingOptionsArea.appendChild(streamOptionsTitle);
   
        // Cast and Crew
        //var castCrew = data.cast;
        //var movieRating = `<p> Rating:  ${movieRatingText}</p>`;

        //Display list of streaming options (or else statement message if none available)
        optionChecker = Object.keys(data.streamingInfo);
        if (optionChecker.length > 0) {
            var streamOptionsList = document.createElement('p');
            streamOptionsList.textContent = Object.keys(data.streamingInfo);
            var streamingOptionsListArea = document.querySelector("#streaming-options-header");
            streamingOptionsListArea.appendChild(streamOptionsList);

        } else {
            var noStreamOptions = document.createElement('p');
            var streamingOptionsListArea = document.querySelector("#streaming-options-header");
            noStreamOptions.textContent = "No streaming options available. You might need to buy or rent this Movie.";
            streamingOptionsListArea.appendChild(noStreamOptions);
        }
    })
    // Console message if fetch is unsuccessful
    .catch(err => {
	    console.error(err);
    });
};
// Calvin's Section ends

 // TMDB Fetch
 $("#submitBtn").on("click", function(event) {
    $("#movie-info").empty();
     event.preventDefault();
    var searchMovie = $("#search-bar").val();
    var movieIdFetch = "https://api.themoviedb.org/3/search/movie?api_key=58bc4a862a66afe4f88190b44a8dd8dd&language=en-US&query=" + searchMovie + "&page=1";
    console.log(searchMovie);
    console.log(movieIdFetch);
    fetch(movieIdFetch)    
   
    .then(response => response.json())
    .then(data => {console.log(data)

        var movieInfoArea = $("#movie-info");
        // Title
        var movieTitleText = data.results[0].title;
        var movieTitle = `<h2 class="card-header-title">${movieTitleText}</h2>`;
        // Image 
        var movieUrlText = data.results[0].poster_path;
        var movieImage = `<img class="card-image" src="https://image.tmdb.org/t/p/w220_and_h330_face${movieUrlText}"/>`;
        // Overview
        var movieOverviewText = data.results[0].overview;
        var movieOverview = `<div> ${movieOverviewText}</div>`;
        //Rating
        var movieRatingText = data.results[0].vote_average;
        var movieRating = `<p> Rating:  ${movieRatingText}</p>`;
        // Append
        movieInfoArea.append(movieTitle, movieImage, movieOverview, movieRating);
        //

        var movieIdExtract = data.results[0].id;
        movieId = movieIdExtract;
        streamingAvailabilityFetch();
    });
   });

function mainConstructor(){
    //Clears the main of data
    
    //Creates the elements that should be displayed in the main
    //todo: Add styling classes
    
    var whereToWatch = $("<div>").attr("id", "service-list");
    var whereToTitle = ("<p>").text("Where to Watch");
    var movieTitle = $("<h2>").text(_locationOfFetchedMovieName);
    var movieInfo = $("<div>").attr("id", "movie-info");
    var movieRating = $("<p>").text("Rating" + _fetchedRatingData);
    var castAndCrew = $("<p>").text("Cast & Crew: " + _fetchedCastAndCrew);
    var plot = $("<p>").text("Plot: " + _fetchedPlot);

    //todo: Add appends for movie links after function is understood
    //Appends the blocks together
    whereToWatch.append(whereToTitle);
    movieInfo.append(movieRating, castAndCrew, plot);
    $("main").append(movieImage, whereToWatch, watchListAddBtn, movieTitle, movieInfo);
}

//Creates a slide effect for the rating and release paragraphs and causes the button to rotate
slideBtn.click(function(){
    //todo: Import a image and add a rotation effect
    $(this).siblings("p").slideToggle("slow");
});