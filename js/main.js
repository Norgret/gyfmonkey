const apiKey = 'TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB';

//this function gets the trending
async function getTrending() {
    let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=15&`) //'limit' controls how many will show, grabs trending
    let data = await response.json()
    return data
}
//getTrending().then(data => showImg(data))

//--------------------------
//this function is a search

async function getSearch(search, number = 10) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB&q=${search}&limit=${number}&offset=0&rating=g&lang=en`)
    let data = await response.json()
    return data
}
// getSearch('fail', 20).then(data => showImg(data)) //first parameter is the search keyword, the second is the number of results to be displayed.

//--------------------
//this function gets a GIF by an ID

async function getByID(ID = 'u2TrRPK8J6Bwc') {
    let response = await fetch(`https://api.giphy.com/v1/gifs/${ID}?api_key=TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB`)
    let data = await response.json()
    console.log(data)
    return data
}
//getByID().then(data => showImg(data))

//--------------------
//the function that creates some simple HTML to show the gifs
function showImg(info) {
    console.log(info.data.id)
    let gifHTML = ''
    /*
 
    url to get the raw gif
    https://i.giphy.com/media/{GIF_ID_HERE}/giphy.mp4
 
    */
    //if only 1 gif is returned then doesn't need to loop
    if (info.data.length == undefined) {
        console.log('test')
        gifHTML = `<div class="video-view">
        <video autoplay loop muted class="video">
            <source type="video/webm" src="https://i.giphy.com/media/${element}/giphy.mp4">
        </video>
        <div class="video-content">
            <button onclick="remove('${element}')">Remove</button>
            </div>
        </div>`;
    }

    //if there is a list of gifs then runs a loop
    else {
        let heartStatus = ''
        let chosenFavorites = JSON.parse(localStorage.getItem('stored_GIFS'))
        for (let a = 0; a < info.data.length; a++) { //loops through each gif and creates some html for each one
            gifHTML += `<div class="video-view">
            <video autoplay loop muted class="video">
                    <source type="video/webm" src="https://i.giphy.com/media/${info.data[a].id}/giphy.mp4">
                </video>
        <div class="video-content">
        <i class="fas fa-heart" onclick = "favGif('${info.data[a].id}')" ></i>
        <i class="fas fa-copy" onclick = "copy('https://i.giphy.com/media/${info.data[a].id}/giphy.gif')"></i>
        <i class="fas fa-info-circle"></i>
            </div>
        </div>`
        }
    }
    // <video autoplay loop muted class="video">
    //         <source type="video/webm" src="https://i.giphy.com/media/${info.data[a].id}/giphy.mp4">
    //     </video>
    document.getElementById('test').innerHTML = gifHTML;
}

function copy(url) {
    navigator.clipboard.writeText(url)
}

//Hamburger Menu Code
let hamMenu = document.getElementById('hamburger');
let dropMod = document.getElementById('drop-down-nav');

let activeMenu = false;

hamMenu.onclick = function () {
    if (activeMenu == false) {
        dropMod.innerHTML = `<div id="links">
    <a href="favorites.html">Favorites</a>
    <a href="gifinfo.html">Gif Info</a>
    <a href="browse.html">Browse</a>
</div>`;
        dropMod.style.height = "1vw";
        dropMod.style.width = "100%";
        setTimeout(function () {
            dropMod.style.height = "2vw";
            setTimeout(function () {
                dropMod.style.height = "3vw";
                setTimeout(function () {
                    dropMod.style.height = "4vw";
                    setTimeout(function () {
                        dropMod.style.height = "5vw";
                        setTimeout(function () {
                            dropMod.style.height = "6vw";
                            setTimeout(function () {
                                dropMod.style.height = "7vw";
                                setTimeout(function () {
                                    dropMod.style.height = "8vw";
                                    setTimeout(function () {
                                        dropMod.style.height = "9vw";
                                        setTimeout(function () {
                                            dropMod.style.height = "10vw";
                                        }, 10);
                                    }, 10);
                                }, 10);
                            }, 10);
                        }, 10);
                    }, 10);
                }, 10);
            }, 10);
        }, 10);

        dropMod.style.marginTop = "10.5vw";
        dropMod.style.position = "fixed";
        activeMenu = true;
    }
    else if (activeMenu == true) {
        document.getElementById('drop-down-nav').innerHTML = ``;
        dropMod.style.height = "0vw";
        activeMenu = false;
    }
}
