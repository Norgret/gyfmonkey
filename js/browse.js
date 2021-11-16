/*
<body onload="showResults()"> must be in the browse.html for it to work properly
loadBrowsePage() function must be used on a search bar that is NOT in the browse page
runSearch() function must only be used in the browse page
*/


async function getSearch(search, number = 50) { //the API call
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB&q=${search}&limit=${number}&offset=0&rating=g&lang=en`)
    let data = await response.json()
    return data
}
function loadBrowsePage() { //runs when a search bar is used from a page that isn't browse.html
    localStorage.setItem('searchTerm', document.getElementById('search').value);
    document.location.href = 'http://127.0.0.1:5500/html/browse.html';
}
function showResults() { //runs when the page loads
    if (localStorage.getItem('searchTerm') !== null) {//runs if the local storage is not empty(means the search was made from the browse.js page)
        getSearch(localStorage.getItem('searchTerm')).then(data => showSearch(data));
        localStorage.removeItem('searchTerm'); //clears the search term now that the user is on the browse page
    }
}
function runSearch() { //Gets the data from the searchBar and then runs the showSearch function
    let searchIn = document.getElementById('search').value
    getSearch(searchIn).then(data => showSearch(data)) //first parameter is the search keyword, the second is the number of results to be displayed.

}
function showSearch(info) {
    let gifHTML = '<div id="gifHolder">'
    //if only 1 gif is returned then doesn't need to loop
    if (info.data.length == 0) {
        gifHTML += `<p>NO RESULTS</p>
        </div>`;
    }

    //if there is a list of gifs then runs a loop
    else {
        for (let a = 0; a < info.data.length; a++) { //loops through each gif and creates some html for each one

            gifHTML += `<div class="video-view">
            <video autoplay loop muted class="video">
                    <source type="video/webm" src="https://i.giphy.com/media/${info.data[a].id}/giphy.mp4">
                </video>
        <div class="video-content">
        <button class="heartButton"onclick="favGif('${info.data[a].id}')"><i class="fas fa-heart" id="heart-${info.data[a].id}"></i></button>
        <i class="fas fa-copy tooltip" onclick = "copy('https://i.giphy.com/media/${info.data[a].id}/giphy.gif')"><span class="toolTipText">Copied!</span></i>
        <i class="fas fa-info-circle" onclick="location.href = 'gifinfo.html'"></i>
            </div>
        </div>`

        }
    }
    /* 
        original heart button: (wouldn't work so changed it to a button)
        <i class="fas fa-heart" id="heart-${info.data[a].id}"onclick="favGif('${info.data[a].id}') toggleFavorite('${info.data[a].id}')" ></i>
        New heart button:
        <button class="heartButton"onclick="favGif('${info.data[a].id}')"><i class="fas fa-heart" id="heart-${info.data[a].id}"></i></button>
        I removed the button styling so it looks just like the original heart button but
        is now able to change colors

    */



    gifHTML += `</div>`;
    //sets the html of the gifs searched
    document.getElementById('body-container').innerHTML = gifHTML;
    //if there are gifs in the storage runs the code
    if (localStorage.getItem('stored_GIFS') !== null) {
        //gets the currentFavorites from the local storage
        let currentFavorites = JSON.parse(localStorage.getItem('stored_GIFS'))
        //loops through each one, tries to find the id
        for (let a = 0; a < currentFavorites.length; a++) {
            try { //if found, changes color
                document.getElementById(`heart-${currentFavorites[a]}`).style.color = 'pink';
                console.log('color changed');
            }
            catch { //if not found nothing happens
                console.log('not there');
            }
        }
    }
}

function copy(url) {
    navigator.clipboard.writeText(url);
}