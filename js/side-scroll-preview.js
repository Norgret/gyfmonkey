
// accepts array of gifs
function renderBananaPreview(gifs) {
	let bananaPreview = document.getElementById('banana-gifs-display');
	for (const gif of gifs) {
		bananaPreview.innerHTML += getGifPreviewHTML(gif, display = 'gif-preview-dynamic-width');
	}
}

// accepts array of gifIDs
function renderFavoritesPreview(gifIDs) {
	let favoritesPreview = document.getElementById('favorite-gifs-display');
	for (const gifID of gifIDs) {
		favoritesPreview.innerHTML += getGifPreviewHTML(null, display = 'gif-preview-dynamic-width', id = gifID);
	}
}


//
// render side-scrolling previews
//

// render banana gifs preview
loadGifs(10, 0, query = "banana").then((gifs) => {
	renderBananaPreview(gifs);
});

// render favorites preview
loadFavoriteGifs(10).then((gifIDs) => {
	renderFavoritesPreview(gifIDs);
});