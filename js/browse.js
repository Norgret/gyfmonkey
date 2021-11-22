
let _search;

// runs when page redirects to browse.html
function showResults() {
    let searchQuery = localStorage.getItem('searchTerm');
    _search = new Search(searchQuery);
    console.log(_search);
    localStorage.removeItem('searchTerm');
}

// returns Search object
function runSearch() {
    let searchQuery = document.getElementById('search').value;
    _search = new Search(searchQuery);
}


/*
 *  infinite scrolling for dynamic display
 *  source: dynamic-display.js
 */

async function loadContent() {
    window.removeEventListener('scroll', handler);
    console.log(_search);
    const gifs = await _search.loadResults(20);
    renderDynamicGifDisplay(gifs);
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
