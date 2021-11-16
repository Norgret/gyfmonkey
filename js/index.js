//
//  API functions
//

apiKey = 'TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB';
trendingGiphyURL = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;

async function getTrendingGifs(limit = 1) {
    let response = await fetch(`${trendingGiphyURL}&limit=${limit}`);
    let data = await response.json();
    return data;
}

async function getRandomGif() {
    let response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`);
    let data = await response.json();
    return data;
}

//
//  Render backgroud gif display
//

let backgroundGifDisplay = document.getElementById('background-gif-display');

function renderBackgroundDisplay(mobile = false) {
    let limit;
    if (mobile) limit = 9;
    else limit = 15;
    getTrendingGifs(limit).then((gifs) => {    // execute callback on 15 gif objects
        for (let gif of gifs.data) {
            backgroundGifDisplay.innerHTML += `
                <div class='gif-container'>
                    <video autoplay loop muted class="gif">
                        <source type="video/webm" src="${gif.images.preview.mp4}">
                    </video>
                </div>
            `;
        }
    });
}

renderBackgroundDisplay();
