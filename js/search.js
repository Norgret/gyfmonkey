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
    getSearch(searchBar.value).then(data => renderGifPreview(data));
}

function renderGifPreview(gifs) {

    // location.href = "browse.html";

    let preview = document.getElementById('dynamic-gifs-display');

    gifs.data.forEach((gif) => {
        console.log(gif);
        preview.innerHTML += `
        <div class='gif-preview'>
            <video autoplay loop muted class='media'>
                <source type='video/webm' src="https://i.giphy.com/media/${gif.id}/giphy.mp4">
            </video>
            <div class='media-overlay'>
                <i class='btn fas fa-heart' onclick = "likeGif('${gif.id}')" ></i>
                <i class='btn fas fa-copy' onclick = "copyToClipboard('https://i.giphy.com/media/${gif.id}/giphy.gif')"></i>
                <i class='btn fas fa-info-circle' onclick="location.href = 'gifinfo.html'"></i>
            </div>
        </div>
        `;
    });

}

function copyToClipboard(url) {
    navigator.clipboard.writeText(url);
}