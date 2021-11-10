async function getSearch(search, number = 10) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB&q=${search}&limit=${number}&offset=0&rating=g&lang=en`)
    let data = await response.json()
    return data
}
function runSearch() {
    let searchIn = document.getElementById('searchBar').value
    let numResults = document.getElementById('searchNum').value
    getSearch(searchIn, numResults).then(data => showImg(data)) //first parameter is the search keyword, the second is the number of results to be displayed.

}
