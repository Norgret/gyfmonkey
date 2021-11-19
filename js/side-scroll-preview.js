
// accepts array of gifs
function renderBananaPreview(gifs) {
	let bananaPreview = document.getElementById('banana-gifs-display');
	for (const gif of gifs) {
		bananaPreview.innerHTML += getGifPreviewHTML(gif, display = 'gif-preview-dynamic-width');
	}
}

// accepts array of gifs
function renderFavoritesPreview(gifs) {
	let favoritesPreview = document.getElementById('favorite-gifs-display');
	for (const gif of gifs) {
		favoritesPreview.innerHTML += getGifPreviewHTML(gif, display = 'gif-preview-dynamic-width');
	}
}


// favorite gif retreival, move this to main.js
// let savedGifs = []
// if (localStorage.getItem('stored_GIFS') == null) {
//     savedGifs = [];
// }
// else {
//     savedGifs = JSON.parse(localStorage.getItem('stored_GIFS'));
// }
async function loadFavoriteGifs(limit = null) {
	return await JSON.parse(localStorage.getItem('stored_GIFS'));
}


// call render functions
loadGifs(10, 0, query = "banana").then((gifs) => {
	renderBananaPreview(gifs);
});

loadFavoriteGifs().then((gifs) => {
	renderFavoritesPreview(gifs);
});