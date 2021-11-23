/*
 *  render dynamic favorites display
 *  source: dynamic-display.js
 */

// const favoriteGifs = loadFavoriteGifs();

console.log(favoriteGifs);
async function loadContent() {
    renderDynamicGifDisplayByIds(favoriteGifs);
}

loadContent();