
/*
 *	Render backgroud gif display
 */

let backgroundGifDisplay = document.getElementById('background-gif-display');

// later, will optomize for mobile
// * mobile only requires 9 background gifs, so should only render 9 gifs
function renderBackgroundDisplay(mobile = false) {
	let limit = mobile ? 9 : 15;
	const monkeySearch = new Search("monkey");			// initialize monkeySearch
	monkeySearch.loadResults(limit).then((gifs) => {	// execute callback on 15 monkey gif objects
		backgroundGifDisplay.style = 'display: none';	// hide all gif previews until loaded onto DOM
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
 *	infinite scrolling for dynamic display
 *	source: dynamic-display.js
 */

async function loadContent() {
	window.removeEventListener('scroll', handler);
	let trendingGifs = await getTrendingGifs(20);
	renderDynamicGifDisplay(trendingGifs);
	window.addEventListener('scroll', handler);
}

loadContent();


function handler() {
	const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
	const threshold = 1500;
	if (scrollTop + clientHeight > scrollHeight - threshold) {
		loadContent();
	}
}
