// return
async function getTrendingGifs() {
    let response = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB&limit=20&rating=g");
    let data = await response.json();
    return data;
}