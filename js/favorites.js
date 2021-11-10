let savedGifs = []
if (localStorage.getItem('stored_GIFS') == null) {
    console.log('works');
    savedGifs = [];
}
else {
    savedGifs = JSON.parse(localStorage.getItem('stored_GIFS'));
    console.log(savedGifs);
}

function favGif(id) {
    savedGifs.push(id);
    console.log(savedGifs);
    localStorage.setItem('stored_GIFS', JSON.stringify(savedGifs));
}

//function for clear the local storage for testing
function clearStorage() {
    localStorage.removeItem('stored_GIFS');
}

function render() {
    let htmlArea = document.getElementById('testArea');
    let htmlContent = '';
    savedGifs.forEach(element => {
        htmlContent += `<div class="video-view">
        <video autoplay loop muted class="video">
            <source type="video/webm" src="https://i.giphy.com/media/${element}/giphy.mp4">
        </video>
        <div class="video-content">
            <button onclick="remove('${element}')">Remove</button>
            </div>
        </div>`;
    });

    htmlArea.innerHTML = htmlContent;
}

function remove(gifToGo) {
    let index = savedGifs.indexOf(gifToGo)
    savedGifs.splice(index, 1)
    localStorage.setItem('stored_GIFS', JSON.stringify(savedGifs));
    console.log(JSON.parse(localStorage.getItem('stored_GIFS')))
    render()
}
/* HTML code to show the gifs when the page loads

<script src="../js/favorites.js"></script>
<script type="text/javascript">
    window.onload = render();
</script>

*/