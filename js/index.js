
async function getTrendingGifs(limit = 1) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB&limit=${limit}`);
    let data = await response.json();
    return data;
}

async function getRandomGif() {
    let response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB&limit=${limit}`);
    let data = await response.json();
    return data;
}

async function getRandomGifs(limit = 1) {
    let gifs = [];

    return gifs;
}

function displayGif() {

}



let backgroundGifDisplay = document.getElementById('background-gif-display');

getTrendingGifs(15).then((gifs) => {
    console.log(gifs.data);
    for (let gif of gifs.data) {
        console.log(gif.images.preview.mp4);
        backgroundGifDisplay.innerHTML += `
            <div class='gif-container'>
                <video autoplay loop muted class="video">
                    <source type="video/webm" src="${gif.images.preview.mp4}">
                </video>
            </div>
        `;
    }
});