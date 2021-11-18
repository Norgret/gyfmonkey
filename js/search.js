/*
<body onload="showResults()"> must be in the browse.html for it to work properly
loadBrowsePage() function must be used on a search bar that is NOT in the browse page
runSearch() function must only be used in the browse page
*/

let searchBar = document.getElementById('search-bar-entry');

async function getSearch(query, number = 30) { //the API call
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB&q=${query}&limit=${number}&offset=0`);
    let data = await response.json();
    return data;
}

// run search on search bar value
function runSearch() {
    getSearch(searchBar.value).then(data => renderDynamicGifDisplay(data));
}


function copyToClipboard(url) {
    navigator.clipboard.writeText(url);
}