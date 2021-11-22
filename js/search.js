
let searchBar = document.getElementById('search-bar-entry');

// run search on search bar value
function runSearch() {
    loadGifs(searchBar.value).then(data => renderDynamicGifDisplay(data));
}