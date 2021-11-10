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