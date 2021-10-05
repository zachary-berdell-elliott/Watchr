var watchListArray = JSON.parse(localStorage.getItem("watchlist-array")) || [];
//var watchListAddBtn = $("#watchlist-button");
var watchList = $("#watch-list");

function watchlistDisplayer(){
    watchListArray.forEach(function(i){
        var watchListBlock = $("<button>").text(i);
        watchList.append(watchListBlock);
    });
}

watchListAddBtn.click(function(){
    watchListArray.push(movieName);
    localStorage.setItem("watchlist-array", JSON.stringify(watchListArray));
});

watchlistDisplayer();


