let savedGifs = []
if (localStorage.getItem('stored_GIFS') == null) {
    savedGifs = [];
}
else {
    savedGifs = JSON.parse(localStorage.getItem('stored_GIFS'));
}

function favGif(id) { //adds the gif to the storage and changes the color of the heart
    if (savedGifs.indexOf(id) == -1) {
        savedGifs.push(id);
        //gets the id of the font awesome heart by the id given to it and changes color
        document.getElementById('heart-' + id).style.color = 'pink';
        localStorage.setItem('stored_GIFS', JSON.stringify(savedGifs));
    }
    else {//removes the gif from the storage and changed heart back to normal
        let toGoIndex = savedGifs.indexOf(id);
        savedGifs.splice(toGoIndex, 1);
        localStorage.setItem('stored_GIFS', JSON.stringify(savedGifs));
        document.getElementById('heart-' + id).style.color = 'black';
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
        <i class="fas fa-copy tooltip" onclick = "copy('https://i.giphy.com/media/${element}/giphy.gif')"><span class="toolTipText">Copied!</span></i>
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
    render();
}
/* HTML code to show the gifs when the page loads

<script src="../js/favorites.js"></script>
<script type="text/javascript">
    window.onload = render();
</script>

*/