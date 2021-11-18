let currentGif = JSON.parse(localStorage.getItem('currentGifInfo'));

async function getInfo(gif) { //the API call
    let response = await fetch(`https://api.giphy.com/v1/gifs/${gif}?api_key=TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB`);
    let data = await response.json();
    return data;
}

getInfo(currentGif).then(data => showInfo(data));

function showInfo(data) {
    let gifTitle = data.data.title;
    let gifURL = data.data.url;
    let gifHeight = data.data.images.original.height;
    let gifWidth = data.data.images.original.width;
    let originalGifDate = data.data.import_datetime;
    let chosenGifHtml = `
    <div id="infoContainer">
    <h1>${gifTitle}</h1>
    <video autoplay loop muted class="video">
        <source type="video/webm" src="https://i.giphy.com/media/${data.data.id}/giphy.mp4">
    </video>
    <div>Original Width: ${gifWidth}</div>
    <div>Original Height: ${gifHeight}</div>
    <div>Date Uploaded: ${originalGifDate}</div>
    <div>URL to Giphy: <a href="${gifURL}" target="_blank">Link</a></div>
    `;

    chosenGifHtml += '</div>';
    document.getElementById('body-container').innerHTML = chosenGifHtml;
}