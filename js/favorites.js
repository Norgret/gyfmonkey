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
    if (savedGifs.indexOf(id) == -1) {
        savedGifs.push(id);
        console.log(savedGifs);
        localStorage.setItem('stored_GIFS', JSON.stringify(savedGifs));
    }
    else {
        console.log('gif already added');
    }
}

//function for clear the local storage for testing
function clearStorage() {
    localStorage.removeItem('stored_GIFS');
}

function render() {
    let htmlArea = document.getElementById('body-container');
    let htmlContent = '<div id="gifHolder">';
    savedGifs.forEach(element => {
        htmlContent += `<div class="video-view">
        <video autoplay loop muted class="video">
            <source type="video/webm" src="https://i.giphy.com/media/${element}/giphy.mp4">
        </video>
        <div class="video-content">
        <i class="fas fa-copy" onclick = "copy('https://i.giphy.com/media/${element}/giphy.gif')"></i>
        <i class="fas fa-info-circle" onclick="location.href = 'gifinfo.html'"></i>
            <i class="fas fa-times" onclick="remove('${element}')"></i>
            </div>
        </div>`;
    });
    htmlContent += '</div>'
    htmlArea.innerHTML = htmlContent;
}

function remove(gifToGo) {
    let index = savedGifs.indexOf(gifToGo);
    savedGifs.splice(index, 1);
    localStorage.setItem('stored_GIFS', JSON.stringify(savedGifs));
    console.log(JSON.parse(localStorage.getItem('stored_GIFS')));
    render();
}
/* HTML code to show the gifs when the page loads

<script src="../js/favorites.js"></script>
<script type="text/javascript">
    window.onload = render();
</script>

*/