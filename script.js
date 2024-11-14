// Fetch the search query parameter from URL
const params = new URLSearchParams(window.location.search);
const movieName = params.get('movie');

// Fetch movie details from the API
const options = {
    method: 'GET',
    headers: { 
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzA3NGI3OTZmMDU0ZGEzMTA3N2Q5YThmYzlhOGQ4MCIsInN1YiI6IjY1ZTYzNDY0OTQ1MWU3MDE0YTVhMDMxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CQi95mBVyr4-TzusaW4vgQmxePK8J1v3Ig5xoDkT-G4'
    }
};

fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`, options)
.then(response => response.json()).then(response => {
        // Handle the API response here
        // You can manipulate the DOM to display the response data
        displayMovieDetails(response.results);
        // console.log("hi");
        // console.log(response.results[2].overview);
    }).catch(err => console.error(err));

function displayMovieDetails(movieDetails) {
    const container = document.getElementById('container');
    
    movieDetails.forEach(movie => {
        
        const movieDiv = document.createElement('div');
        movieDiv.id = 'a';

        const imgElement = document.createElement('img');
        imgElement.src = `https://image.tmdb.org/t/p/original` + movie.poster_path; // Assuming API provides a poster path
        imgElement.alt = movie.title;

        const detDiv = document.createElement('div');
        detDiv.id = 'det';

        const titleElement = document.createElement('h1');
        titleElement.textContent = movie.title;

        const genreElement = document.createElement('h2');
        genreElement.textContent = movie.genre; // Update with actual genre data

        const releaseYearElement = document.createElement('p');
        releaseYearElement.textContent = 'Release Year: ' + movie.release_date;

        detDiv.appendChild(titleElement);
        detDiv.appendChild(genreElement);
        detDiv.appendChild(releaseYearElement);

        movieDiv.appendChild(imgElement);
        movieDiv.appendChild(detDiv);

        // Add event listener to each movie div
        movieDiv.addEventListener('click', () => {
            // Navigate to the movie details page with movie ID as parameter
            window.location.href = `movie_details.html?id=${movie.id}`;
        });

        container.appendChild(movieDiv);    
    });
}
