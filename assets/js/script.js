var watchListArray = JSON.parse(localStorage.getItem("watchlist-array")) || [];
var watchListAddBtn = $("#watchlist-button");
var watchList = $("#watch-list");
var slideBtn = $(".slide-panel").children("i");

//Creates a new button for each saved array item
watchListArray.forEach(function(i){
    watchListDisplayer(i);
});

function watchListDisplayer(movieValue){
    var watchListBlock = $("<div>").addClass("watchlist-block is-flex");
    var watchListName = $("<button>").addClass("watchlist-name").text(movieValue);
    var watchListRemove = $("<button>").addClass("watchlist-remove").text("X");
        
    watchListBlock.append(watchListName, watchListRemove);
        
    //Sends the user to the watchlist item that they saved
    watchListName.click(function(){
        searchMovie = watchListName.text();
        getMovie(searchMovie);
    });

    //Removes item from the watchlist
    watchListRemove.click(function(){
        watchListArray.splice(watchListArray.indexOf(movieValue, 0), 1);
        $(this).parent().remove();
        localStorage.setItem("watchlist-array", JSON.stringify(watchListArray));
        });
        
    watchList.append(watchListBlock);
}
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
        console.log(optionChecker);
        if (optionChecker.length > 0) {
            //Create UL
            var streamUl = document.createElement('ul');
            streamUl.setAttribute("id", "streamUl");
            var streamingOptionsListArea = document.querySelector("#streaming-options-header");
            streamingOptionsListArea.appendChild(streamUl);

            //Create and append list items
            optionChecker.forEach(function (optionChecker) {
                let li = document.createElement('li');
                streamUl.appendChild(li);
                li.innerHTML += optionChecker;
            });

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
        var optionsError = document.createElement('p');
        var streamingOptionsListArea = document.querySelector("#streaming-options-header");
        optionsError.textContent = "Oh no! There was a problem with your request.";
        streamingOptionsListArea.appendChild(noStreamOptions);
    });
};
// Calvin's Section ends

 $("#submitBtn").on("click", function(event) {
    event.preventDefault();
    var searchMovie = $("#search-bar").val();
    getMovie(searchMovie);
   });

//Creates a slide effect for the rating and release paragraphs and causes the button to rotate
slideBtn.click(function(){
    //todo: Import a image and add a rotation effect
    $(this).siblings("p").slideToggle("slow");
});

//TMDB fetch
function getMovie(searchMovie){
    $("#title-column").empty();
    $("#info-column").empty();
    $("#overview-column").empty();
    var movieIdFetch = "https://api.themoviedb.org/3/search/movie?api_key=58bc4a862a66afe4f88190b44a8dd8dd&language=en-US&query=" + searchMovie + "&page=1";
    console.log(searchMovie);
    console.log(movieIdFetch);
    fetch(movieIdFetch)    
   
    .then(response => response.json())
    .then(data => {console.log(data)
        //var movieInfoArea = $("#movie-info");
        var titleColumn = $("#title-column");
        var infoColumn = $("#info-column");
        var overviewColumn = $("#overview-column");
        // Title
        var movieTitleText = data.results[0].title;
        var movieTitle = `<h2 class="card-header-title m-2">${movieTitleText}</h2>`;
        //Add to watchlist button
        var watchListAddBtn = $("<button>").attr("id", "watchlist-button").text("Add to Watchlist");
        //Function to save the item to the watchlist when the user clicks the button.
        watchListAddBtn.click(function(){
            //Makes sure duplicates aren't added
            var notDuplicate = true;
            watchListArray.forEach(function(i){
            if (movieTitleText === i){
              notDuplicate = false;
            }
           });

           if (notDuplicate) {
                watchListArray.push(movieTitleText);
                localStorage.setItem("watchlist-array", JSON.stringify(watchListArray));
                watchListDisplayer(movieTitleText);
           }
        });
        // Release Date
         var movieDateText = data.results[0].release_date;
         var movieReleaseDate = `<h3 class="card-content m-2">Release Date: ${movieDateText}</h3>`;
        // Image 
        var movieUrlText = data.results[0].poster_path;
        var movieImage = `<img class="card-image m-2" src="https://image.tmdb.org/t/p/w220_and_h330_face${movieUrlText}"/>`;
        // Overview
        var movieOverviewText = data.results[0].overview;
        var movieOverview = `<div class="card-content m-2 id="overview"> ${movieOverviewText}</div>`;
        
        //Rating
        var movieRatingText = data.results[0].vote_average;
        var movieRating = `<p class="card-content m-2"> Rating:  ${movieRatingText}</p>`;
        // Append
        //movieInfoArea.append(movieTitle, movieReleaseDate, watchListAddBtn, movieImage, movieRating, movieOverview);
        titleColumn.append(movieImage, movieTitle);
        infoColumn.append(movieReleaseDate, watchListAddBtn, movieRating);
        overviewColumn.append(movieOverview);
        var movieIdExtract = data.results[0].id;
        movieId = movieIdExtract;
        streamingAvailabilityFetch();
     });
}
