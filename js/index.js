
/*
 *	API functions, networking
 */

// const apiKey = 'TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB';
// apiKey defined in main.js
const giphyURL = `https://api.giphy.com/v1/gifs`;
const trendingGiphyURL = `${giphyURL}/trending?api_key=${apiKey}`;
const searchGiphyURL = `${giphyURL}/search?api_key=${apiKey}`;
const monkeyGiphyURL = `${searchGiphyURL}&q=monkey`;
let _browseResultsOffset = 0;	// offset counter for trending results
let _searchResultsOffset = 0;	// offset counter for search results


// get gifs without incrementing global offset
async function loadGifs(limit, offset = _searchResultsOffset, query = null) {
	let response = query ?
		await fetch(`${searchGiphyURL}&limit=${limit}&offset=${offset}&q=${query}`) :
		await fetch(`${trendingGiphyURL}&limit=${limit}&offset=${offset}`);

	let data = await response.json();
	return data.data;
}


// get array of trending gifs
async function getTrendingGifs(limit = 1, offset = _browseResultsOffset, monkey = false) {
	if (! monkey) _browseResultsOffset += limit;	// increment offset
													// this allows trending results to by unique
	// get monkey-related gifs if monkey == true
	let queries = `limit=${limit}&offset=${offset}`;
	let response = monkey ?
		await fetch(`${monkeyGiphyURL}&${queries}`) :
		await fetch(`${trendingGiphyURL}&${queries}`);

	let data = await response.json();
	return data.data;
}


// get gif by ID
async function getGifById(gifID) {
	let response = await fetch(`${giphyURL}/${gifID}?api_key=${apiKey}`);
	let data = await response.json();
	return data.data[0];	// extract gif from array
}

async function getGifsByIds(gifIDs) {
	let gifs = [];
	for (const id of gifIDs) {
		gifs.push(await getGifById(id));
	}
	return gifs;
}


/*
 *	Local storage
 */

// retreive favorite gif IDs from storage, return array
async function loadFavoriteGifs(limit = null) {
	let gifIDs = await JSON.parse(localStorage.getItem('stored_GIFS'));
	gifIDs = limit ?
		gifIDs.splice(0, limit - 1) :
		gifIDs;

	return gifIDs;
}


/*
 *	Render backgroud gif display
 */

let backgroundGifDisplay = document.getElementById('background-gif-display');

// later, will optomize for mobile
// * mobile only requires 9 background gifs, so should only render 9 gifs
function renderBackgroundDisplay(mobile = false) {
	let limit = mobile ? 9 : 15;
	getTrendingGifs(limit, 0, monkey = true).then((gifs) => {	// execute callback on 15 gif objects
		backgroundGifDisplay.style = 'display: none';			// hide all gif previews until loaded onto DOM
		for (const gif of gifs) {
			backgroundGifDisplay.innerHTML += `
				<div class='gif-container'>
					<video autoplay loop muted class="gif">
						<source type="video/webm" src="${gif.images.preview.mp4}">
					</video>
				</div>
			`;
		}
		backgroundGifDisplay.style = 'display: visible';
	});
}
renderBackgroundDisplay();


/*
 *	Get HTML for gif previews
 */

// valid display parameter can be:
//	'gif-thumbnail'
//	'gif-preview'
//	'gif-preview-dynamic'
//	'gif-preview-dynamic-height'
//	'gif-preview-dynamic-width'
function getGifPreviewHTML(gif = null, display = '', id = null) {
	const gifID = id ? id : gif.id;
	let previewTag =
		`<div class='preview ${display}'>
			<video autoplay loop muted class='media'>
				<source type='video/webm' src="https://i.giphy.com/media/${gifID}/giphy.mp4">
			</video>
			<div class='media-overlay'>
				<i class='btn fas fa-heart' id="homeHeart-${gifID}" onclick = "likeGif('${gifID}')" ></i>
				<i class='btn fas fa-copy' onclick = "copyToClipboard('https://i.giphy.com/media/${gifID}/giphy.gif')"></i>
				<i class='btn fas fa-info-circle' onclick="getInfo('${gifID}')"></i>
			</div>
		</div>`;

	return previewTag;
}
