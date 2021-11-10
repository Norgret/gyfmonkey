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


function clearStorage() {
    localStorage.removeItem('stored_GIFS');
}

function render() {
    console.log('works')
}
/* HTML code

<script src="../js/favorites.js"></script>
<script type="text/javascript">
    window.onload = render();
</script>

*/