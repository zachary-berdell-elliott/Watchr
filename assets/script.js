var watchListArray = JSON.parse(localStorage.getItem("watchlist-array")) || [];
//var watchListAddBtn = $("#watchlist-button");
var watchList = $("#watch-list");

function watchlistDisplayer(){
    watchListArray.forEach(function(i){
        var watchListBlock = $("<h4>").text(i);
        watchList.append(watchListBlock);
    })
}

watchlistDisplayer();


