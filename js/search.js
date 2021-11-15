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

function renderGifPreview(info) {
    let gifHTML = '<div id="gifHolder">'
    //if only 1 gif is returned then doesn't need to loop
    if (!info.data.length) {
        gifHTML = `<p>NO RESULTS</p>
        </div>`;
    }

    //if there is a list of gifs then runs a loop
    else {
        for (let a = 0; a < info.data.length; a++) { //loops through each gif and creates some html for each one

            gifHTML += `<div class="video-view">
            <video autoplay loop muted class="video">
                    <source type="video/webm" src="https://i.giphy.com/media/${info.data[a].id}/giphy.mp4">
                </video>
        <div class="video-content">
        <i class="fas fa-heart" onclick = "favGif('${info.data[a].id}')" ></i>
        <i class="fas fa-copy" onclick = "copy('https://i.giphy.com/media/${info.data[a].id}/giphy.gif')"></i>
        <i class="fas fa-info-circle" onclick="location.href = 'gifinfo.html'"></i>
            </div>
        </div>`
        }
    }
    gifHTML += `</div>`
    document.getElementById('body-container').innerHTML = gifHTML;
}

function copyToClipboard(url) {
    navigator.clipboard.writeText(url)
}