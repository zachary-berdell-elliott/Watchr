var watchListArray = JSON.parse(localStorage.getItem("watchlist-array")) || [];
//var watchListAddBtn = $("#watchlist-button");
var watchList = $("#watch-list");

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

Streaming Availability Fetch
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
});

 // TMDB Fetch
 $("#submitBtn").on("click", function(event) {
     event.preventDefault();
    var searchMovie = $("#search-bar").text();
    var movieIdFetch = "https://api.themoviedb.org/3/search/movie?api_key=58bc4a862a66afe4f88190b44a8dd8dd&language=en-US&query=" + searchMovie + "&page=1";
    console.log(searchMovie);
    fetch(movieIdFetch)    
   
    .then(response => response.json())
    .then(data => console.log(data));
 });