# Movie Screen Flix

**A small movie search website: type a movie name, pick a result, and see its details and trailer, using data from TMDB.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TMDB API](https://img.shields.io/badge/TMDB-API-01B4E4?logo=themoviedatabase&logoColor=white)

## What is it?

A plain HTML, CSS and JavaScript site made of three pages. All movie data comes from [The Movie Database (TMDB) API](https://developer.themoviedb.org/). There is no backend and no build step.

## Features

- **Search** (`index.html`): type a movie name and press **Search**.
- **Results list** (`details.html`): shows every match from TMDB search with its poster, title and release date. Click a movie to open its page.
- **Movie page** (`movie_details.html`): shows the backdrop image, the movie's logo (if TMDB has one), rating, release date, runtime, first genre and overview.
- **Trailer:** **Watch Trailer** finds the movie's YouTube trailer on TMDB and plays it in an embedded player. **Stop Trailer** removes the player and brings back the backdrop.
- A **search** button on the movie page goes back to the search page.

## Tech stack

- HTML, CSS, vanilla JavaScript (`fetch`)
- TMDB API v3: `search/movie`, `movie/{id}`, `movie/{id}/images`, `movie/{id}/videos`
- YouTube embeds for trailers

## Run it locally

```sh
git clone https://github.com/ganesh-tadigadapa/MOVIE-SCREEN-FLIX.git
cd MOVIE-SCREEN-FLIX
python3 -m http.server 8000
```

Open http://localhost:8000.

Use a local server, and serve the folder as the site root. The movie page links to `/index.html` and `/search.png`, and those root paths do not work if you open the files straight from disk.

**TMDB token:** the TMDB read access token lives in `config.js`, which every page loads first, and is sent in the `Authorization` header. It is visible to anyone using the site. To use your own, create a free TMDB account, generate a read access token at https://www.themoviedb.org/settings/api, and replace the value of `TMDB_TOKEN` in `config.js`.

## Project structure

```
MOVIE-SCREEN-FLIX/
├── index.html           home page with the search box
├── style.css            styles for the home page
├── details.html         search results page
├── config.js            TMDB token shared by every page
├── script.js            calls TMDB search and builds the results list
├── movies_list.css      styles for the results list
├── movie_details.html   single movie page
├── movie-details.js     loads movie details, logo and trailer from TMDB
├── movie-details.css    styles for the movie page
└── search.png           icon on the movie page's search button
```
