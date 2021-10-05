var watchListArray = JSON.parse(localStorage.getItem("watchlist-array")) || [];
//var watchListAddBtn = $("#watchlist-button");
var watchList = $("#watch-list");

function watchlistDisplayer(){
    watchList.empty();
    watchListArray.forEach(function(i){
        var watchListBlock = $("<button>").text(i);
        watchList.append(watchListBlock);

        watchListBlock.click(function(){
            movieParam = watchListBlock.val();
            ajaxFunc();
        })
    });
}

watchListAddBtn.click(function(){
    watchListArray.push(movieName);
    localStorage.setItem("watchlist-array", JSON.stringify(watchListArray));
    watchlistDisplayer();
});

watchlistDisplayer();


