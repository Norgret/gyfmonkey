
/*
 *	API functions, networking
 */

// const apiKey = 'TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB';
// apiKey defined in main.js
const trendingGiphyURL = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;
const searchGiphyURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`;
const monkeyGiphyURL = `${searchGiphyURL}&q=monkey`;
let _browseResultsOffset = 0;

async function loadGifs(limit, offset = 0, query = null) {
	let response = query ?
		await fetch(`${searchGiphyURL}&offset=${offset}&q=${query}`) :
		await fetch(`${trendingGiphyURL}&offset=${offset}`);
}

async function getTrendingGifs(limit = 1, offset = _browseResultsOffset, monkey = false) {
	if (! monkey) _browseResultsOffset += limit;

	// get monkey-related gifs if monkey == true
	let queries = `limit=${limit}&offset=${offset}`;
	let response = monkey ?
		await fetch(`${monkeyGiphyURL}&${queries}`) :
		await fetch(`${trendingGiphyURL}&${queries}`);

	let data = await response.json();
	return data;
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
		for (let gif of gifs.data) {
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
function getGifPreviewHTML(gif, display = '') {
	let previewTag =
		`<div class='preview ${display}'>
			<video autoplay loop muted class='media'>
				<source type='video/webm' src="https://i.giphy.com/media/${gif.id}/giphy.mp4">
			</video>
			<div class='media-overlay'>
				<i class='btn fas fa-heart' onclick = "likeGif('${gif.id}')" ></i>
				<i class='btn fas fa-copy' onclick = "copyToClipboard('https://i.giphy.com/media/${gif.id}/giphy.gif')"></i>
				<i class='btn fas fa-info-circle' onclick="location.href = 'gifinfo.html'"></i>
			</div>
		</div>`;

	return previewTag;
}