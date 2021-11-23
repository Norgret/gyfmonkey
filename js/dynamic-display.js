
/*
 *	Render dynamic gif display
 *	Support for infinite scrolling
 */

class DynamicGifDisplay {

	constructor() {
		this.columnWidth = 320; // width in px: 300px + 2 * margin
		this.columnsContainer = document.getElementById('dynamic-gifs-display');
		this.numColumns = Math.floor(this.columnsContainer.clientWidth / this.columnWidth);
		this.columns = [];      // contains {height, get()} objects
								// get() returns an HTML parent col element

		// append column objects to this.columns
		for (let i = 0; i < this.numColumns; ++i) {
			this.columnsContainer.innerHTML += `<div class='col col-${i}'><div class='col'></div></div>`;
			this.columns.push({
				height: 0,
				get: () => {
					return this.columnsContainer.getElementsByClassName(`col-${i}`)[0];
				}
			});
		}
	}

	// return the column object with the shortest hight
	getShortestCol() {
		let shortestCol = this.columns[0];
		for (let i = 1; i < this.columns.length; ++i) {
			let col = this.columns[i];
			if (col.height < shortestCol.height) {
				shortestCol = col;
			}
		}
		return shortestCol;
	}


	// append gif to shortest column
	append(gif, id = null) {

		const shortestCol = this.getShortestCol();

		// get all nested div.col children
		const nodes = shortestCol.get().querySelectorAll('div.col');

		// extract most deeply-nested div.col child
		const lastNode = nodes[nodes.length - 1];

		// nest gif preview inside div.col (see below reasoning)
		lastNode.innerHTML += gif ?
			"<div class='col'>" + getGifPreviewHTML(gif, 'gif-preview-dynamic-height') + "</div>":
			"<div class='col'>" + getGifPreviewHTML(null, 'gif-preview-dynamic-height', id) + "</div>";

		// update col.height
		shortestCol.height = shortestCol.get().clientHeight;

	}

	/*
		Gif previews must be recursively nested inside of
		divs for performance. Cannot directly append gif
		preview tag to column because that forces a redraw
		of the entire column and causes lag.
	*/

};

let dynamicGifDisplay = new DynamicGifDisplay();

// accepts gifs array
function renderDynamicGifDisplay(gifs) {
	gifs.forEach(gif => dynamicGifDisplay.append(gif));
}

// accepts array of gif IDs
function renderDynamicGifDisplayByIds(ids) {
	ids.forEach(id => dynamicGifDisplay.append(gif = null, id = id));
}


