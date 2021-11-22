
let searchBar = document.getElementById('search-bar-entry');

// run search on search bar value


/*
 *  Search bar functionality
 *  Redirect to browse.html
 */

// redirects to browse page, runs search query
function loadBrowsePage() {
    localStorage.setItem('searchTerm', document.getElementById('search').value);
    document.location.href = '../html/browse.html';
}