
let _search;

// runs when page redirects to browse.html
function showResults() {
    const searchQuery = localStorage.getItem('searchTerm');
    _search = new Search(searchQuery);
    localStorage.removeItem('searchTerm');

    const titleText = searchQuery ? `Browse "${searchQuery}" Gifs` : `Browse Trending Gifs`;
    document.getElementById('gifs-display-title').innerHTML = titleText;
    loadContent();
}

// returns Search object
function runSearch() {
    let searchQuery = document.getElementById('search').value;
    _search = new Search(searchQuery);
    loadContent();
}


/*
 *  infinite scrolling for dynamic display
 *  source: dynamic-display.js
 */

async function loadContent() {
    window.removeEventListener('scroll', handler);
    const gifs = await _search.loadResults(20);
    renderDynamicGifDisplay(gifs);
    window.addEventListener('scroll', handler);
}

function handler() {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    const threshold = 1500;
    if (scrollTop + clientHeight > scrollHeight - threshold) {
        loadContent();
    }
}
