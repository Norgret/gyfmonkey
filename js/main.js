async function getData() {
    let response = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB&limit=10&rating=g")
    let data = await response.json()
    return data
}
//getData().then(data => console.log(data.data))
getData().then(data => showImg(data))

function showImg(info) {
    let gifHTML = ''
    //console.log(info.data[0].id)
    //https://i.giphy.com/media/${info.data.id}/giphy.mp4

    for (let a = 0; a < info.data.length; a++) {
        //console.log(info.data[a].id)
        gifHTML += `<div><video autoplay loop muted><source type="video/webm" src="https://i.giphy.com/media/${info.data[a].id}/giphy.mp4"</video></div>`
    }
    //console.log(gifHTML)
    document.getElementById('test').innerHTML = gifHTML;
}
