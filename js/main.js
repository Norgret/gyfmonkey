
function copyToClipboard(url) {
    navigator.clipboard.writeText(url)
}


/*
 *  API functions, networking
 */

const apiKey = 'TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB';
const giphyURL = `https://api.giphy.com/v1/gifs`;
const trendingGiphyURL = `${giphyURL}/trending?api_key=${apiKey}`;
const searchGiphyURL = `${giphyURL}/search?api_key=${apiKey}`;

let _browseResultsOffset = 0;   // offset counter for trending results
let _searchResultsOffset = 0;   // offset counter for search results
let _resultsOffset = 0;


// get gifs without incrementing global offset
// should Search class instead
async function loadGifs(limit, offset = 0, query = null) {
    let response = query ?
        await fetch(`${searchGiphyURL}&limit=${limit}&offset=${offset}&q=${query}`) :
        await fetch(`${trendingGiphyURL}&limit=${limit}&offset=${offset}`);

    let data = await response.json();
    return data.data;
}


// get array of trending gifs
async function getTrendingGifs(limit = 1, offset = _browseResultsOffset) {
    _browseResultsOffset += limit;  // increment offset
                                    // this allows trending results to by unique
    let response = await fetch(`${trendingGiphyURL}&limit=${limit}&offset=${offset}`);
    let data = await response.json();
    return data.data;
}


// get gif by ID, returns gif
async function getGifById(gifID) {
    let response = await fetch(`${giphyURL}/${gifID}?api_key=${apiKey}`);
    let data = await response.json();
    return data.data[0];    // extract gif from array
}

// get gifs by IDs, returns array
async function getGifsByIds(gifIDs) {
    let gifs = [];
    for (const id of gifIDs) {
        gifs.push(await getGifById(id));
    }
    return gifs;
}


class Search {
    constructor(query) {
        this.offset = 0;
        this.query = query
    }
    async loadResults(limit) {
        this.offset += limit;
        return await loadGifs(limit, this.offset - limit, this.query);
    }
}


/*
 *  Local storage
 */

// retreive favorite gif IDs from storage, return array
function loadFavoriteGifs(limit = null, offset = null) {
    let gifIDs = JSON.parse(localStorage.getItem('stored_GIFS'));
    gifIDs = limit ?
        gifIDs.splice(0, limit - 1) :
        gifIDs;

    return gifIDs ? gifIDs : [];
}

// clear local storage
function clearStorage() {
    localStorage.removeItem('stored_GIFS');
}


/*
 *  Favorite gif functionality
 */

const hexRed = '#DE023D';
let favoriteGifs = loadFavoriteGifs();

function toggleFavoriteGifByID(id) {
    heartButton = document.getElementById(`heart-${id}`);
    heartButton.classList.toggle('toggled');
    if (!favoriteGifs.includes(id)) {   // favorites gif if not already saved
        favoriteGifs.push(id);
        heartButton.style = `color: ${hexRed}`;
    }
    else {                              // removes gif ID from the storage
        favoriteGifs.splice(favoriteGifs.indexOf(id), 1);
        heartButton.style = 'color: white';
    }

    // save new favoriteGifs array
    localStorage.setItem('stored_GIFS', JSON.stringify(favoriteGifs));
}


/*
 *  Gif display buttons functionality
 */

// redirect to gifinfo.html
function getInfo(gifID) {
    localStorage.setItem('currentGifInfo', JSON.stringify(gifID));
    document.location.href = '../html/gifinfo.html';
}


/*
 *  Get HTML for gif previews
 */

// valid display parameter can be:
//  'gif-thumbnail'
//  'gif-preview'
//  'gif-preview-dynamic'
//  'gif-preview-dynamic-height'
//  'gif-preview-dynamic-width'
function getGifPreviewHTML(gif = null, display = '', id = null) {
    const gifID = id ? id : gif.id;
    const toggled = favoriteGifs.includes(gifID) ? "toggled" : "";
    let previewTag =
        `<div class='preview ${display}'>
            <video autoplay loop muted class='media'>
                <source type='video/webm' src="https://i.giphy.com/media/${gifID}/giphy.mp4">
            </video>
            <div class='media-overlay'>
                <i class='btn fas fa-heart ${toggled}' id="heart-${gifID}" onclick = "toggleFavoriteGifByID('${gifID}')" ></i>
                <i class='btn fas fa-copy' onclick = "copyToClipboard('https://i.giphy.com/media/${gifID}/giphy.gif')"></i>
                <i class='btn fas fa-info-circle' onclick="getInfo('${gifID}')"></i>
            </div>
        </div>`;

    return previewTag;
}


/*
*
*
*
*/



//hamburger menu
let hamMenu = document.getElementById('hamburger');
let dropMod = document.getElementById('drop-down-nav');

let activeMenu = false;

hamMenu.onclick = function () {
    if (activeMenu == false) {
        dropMod.innerHTML = `<div id="links">
    <a href="favorites.html">Favorites</a>
    <a href="gifinfo.html">Gif Info</a>
    <a href="browse.html">Browse</a>
</div>`;
        dropMod.style.height = "1vw";
        dropMod.style.width = "100%";
        setTimeout(function () {
            dropMod.style.height = "2vw";
            setTimeout(function () {
                dropMod.style.height = "3vw";
                setTimeout(function () {
                    dropMod.style.height = "4vw";
                    setTimeout(function () {
                        dropMod.style.height = "5vw";
                        setTimeout(function () {
                            dropMod.style.height = "6vw";
                            setTimeout(function () {
                                dropMod.style.height = "7vw";
                                setTimeout(function () {
                                    dropMod.style.height = "8vw";
                                    setTimeout(function () {
                                        dropMod.style.height = "9vw";
                                        setTimeout(function () {
                                            dropMod.style.height = "10vw";
                                        }, 10);
                                    }, 10);
                                }, 10);
                            }, 10);
                        }, 10);
                    }, 10);
                }, 10);
            }, 10);
        }, 10);

        dropMod.style.marginTop = "10.5vw";
        dropMod.style.position = "fixed";
        activeMenu = true;
    }
    else if (activeMenu == true) {
        document.getElementById('drop-down-nav').innerHTML = ``;
        dropMod.style.height = "10vw";
        dropMod.style.width = "100%";
        setTimeout(function () {
            dropMod.style.height = "9vw";
            setTimeout(function () {
                dropMod.style.height = "8vw";
                setTimeout(function () {
                    dropMod.style.height = "7vw";
                    setTimeout(function () {
                        dropMod.style.height = "6vw";
                        setTimeout(function () {
                            dropMod.style.height = "5vw";
                            setTimeout(function () {
                                dropMod.style.height = "4vw";
                                setTimeout(function () {
                                    dropMod.style.height = "3vw";
                                    setTimeout(function () {
                                        dropMod.style.height = "2vw";
                                        setTimeout(function () {
                                            dropMod.style.height = "0vw";
                                        }, 10);
                                    }, 10);
                                }, 10);
                            }, 10);
                        }, 10);
                    }, 10);
                }, 10);
            }, 10);
        }, 10);
        dropMod.style.height = "0vw";
        activeMenu = false;
    }
}
