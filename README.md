
Personal branches:		dev-noah, dev-will, dev-jaxon
Main testing branch:	dev
Main:					main

* * * * *

Main frontend libraries:	bootstrap, flex

Color scheme:
	(primary) Green:			#A2F5B9
	(accent color) Lavendar:	#B8C2F5
	Red:						#DE023D
	Tan:						#F5D790

API key:	TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB
Get 1 gif:	https://api.giphy.com/v1/gifs/trending?api_key=TJeFFaL4XtftdIyxMHSAUNJPNpW9YmnB&limit=1

Giphy documentation:
	Trending endpoint:	https://developers.giphy.com/docs/api/endpoint#trending
	Search endpoint:	https://developers.giphy.com/docs/api/endpoint#search

* * * * *

Workload division and file ownership:

gyfmonkey/

	README.md > Noah


	html/
	- contains all HTML files rendered by end user

		index.html > Noah
		- landing page

		browse.html
		- allows user to browse different categories of gifs

		favorites.html
		- allows user to browse favorited gifs

	js/
	- contains all frontend source JS

		main.js > Jaxon
		- handles gif object and communication with giphy API
		* all HTML files should import main.js

		index.js > Noah
		- JS for landing page


	resources/


	styles/
	- contains all CSS styling
	* untrack ./css before pushing, will cause merge conflict

		css/
		- contains compiled CSS files
		* compile your own SCSS to this folder, do not push CSS files

		scss/
		- contains SCSS files

			_global.scss
			- contains global colors and other variables
			- contains global styles for class names

			main.scss
			- contains global styles for HTML tag names
			* import main.scss in all scss files

			index.scss > Noah
			- styles for index.html
