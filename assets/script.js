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


