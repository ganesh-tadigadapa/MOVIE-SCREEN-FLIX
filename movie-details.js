const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');
console.log(movieId);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzA3NGI3OTZmMDU0ZGEzMTA3N2Q5YThmYzlhOGQ4MCIsInN1YiI6IjY1ZTYzNDY0OTQ1MWU3MDE0YTVhMDMxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CQi95mBVyr4-TzusaW4vgQmxePK8J1v3Ig5xoDkT-G4'
  }
};  

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
  .then(response => response.json())
  .then(response => {
    console.log(response);
    // Extract necessary movie details
    const movie = {
      backdrop_path: response.backdrop_path,
      vote_average: response.vote_average,
      release_date: response.release_date,
      runtime: response.runtime,
      genres: response.genres,  
      overview: response.overview
    };
    // Fetch movie images
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?include_image_language=en&language=en`, options)
      .then(imagesResponse => imagesResponse.json())
      .then(imagesResponse => {
        console.log(imagesResponse);
        // Extract logo from images response
        const logoPath = imagesResponse.logos && imagesResponse.logos.length > 0 ? imagesResponse.logos[0].file_path : null;
        displayMovieDetails(movie, logoPath);
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));

  function displayMovieDetails(movie, logoPath) {
    const container = document.getElementById('container');
  
    const imgdiv = document.createElement('div');
    imgdiv.id = 'imagecontainer';
  
    const imgElement = document.createElement('img');
    imgElement.id = 'imgbg';
    imgElement.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  
    const detailcontainer = document.createElement('div');
    detailcontainer.id = 'detailContainer';
  
    const logoElement = document.createElement('img');
    logoElement.id = 'logo';
    logoElement.src = logoPath ? `https://image.tmdb.org/t/p/original${logoPath}` : ''; // Set logo source only if available
  
    const ratingcontainer = document.createElement('div');
    ratingcontainer.id = 'ratingContainer';
  
    const p1 = document.createElement('p');
    p1.textContent = movie.vote_average;
    const p2 = document.createElement('p');
    p2.textContent = movie.release_date;
    const p3 = document.createElement('p');
    p3.textContent = movie.runtime;
    const p4 = document.createElement('p');
    p4.textContent = movie.genres[0].name;
  
    const h2 = document.createElement('h2');
    h2.textContent = movie.overview;
  
    const watchTrailerButton = document.createElement('button');
    watchTrailerButton.textContent = "Watch Trailer";

  
    const stopTrailerButton = document.createElement('button');
    stopTrailerButton.textContent = "Stop Trailer";
    stopTrailerButton.style.display = 'none'; // Initially hide the stop trailer button
    stopTrailerButton.id = 'stopbtn';
    watchTrailerButton.addEventListener('click', () => {
        toggleTrailer(watchTrailerButton, imgdiv, detailcontainer);
        watchTrailerButton.style.display='none';
        stopTrailerButton.style.display='block';
      });
    stopTrailerButton.addEventListener('click', () => {
      stopTrailer(stopTrailerButton, imgdiv, detailcontainer);
      watchTrailerButton.style.display='block';
      stopTrailerButton.style.display='none';
    });
  
    imgdiv.appendChild(imgElement);
    detailcontainer.appendChild(logoElement);
    ratingcontainer.appendChild(p1);
    ratingcontainer.appendChild(p2);
    ratingcontainer.appendChild(p3);
    ratingcontainer.appendChild(p4);
  
    detailcontainer.appendChild(ratingcontainer);
    detailcontainer.appendChild(h2);
    detailcontainer.appendChild(watchTrailerButton);
    detailcontainer.appendChild(stopTrailerButton);
  
    container.appendChild(imgdiv);
    container.appendChild(detailcontainer);
  }
  function toggleTrailer(watchButton, imgdiv, detailcontainer) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        const trailerKey = response.results.find(result => result.type === 'Trailer' && result.site === 'YouTube');
        if (trailerKey) {
          const trailerUrl = `https://www.youtube.com/embed/${trailerKey.key}?autoplay=1`;
          const iframe = document.createElement('iframe');
          iframe.setAttribute('src', trailerUrl);
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allowfullscreen', '');
          iframe.setAttribute('allow', 'autoplay;');
          iframe.id = "trailerf";
          iframe.style.float = 'right'; // Position iframe towards the right
          imgdiv.style.display = 'none'; // Hide background image
          detailcontainer.insertBefore(iframe, detailcontainer.firstChild); // Insert iframe before other elements
        } else {
          console.error("No trailer available");
        }
      })
      .catch(err => console.error(err));
}

  
  function stopTrailer(stopButton, imgdiv, detailcontainer) {
    stopButton.style.display = 'none'; // Hide the stop trailer button
    const watchTrailerButton = detailcontainer.querySelector('button[textContent="Watch Trailer"]');
    if (watchTrailerButton) {
      watchTrailerButton.style.display = 'inline-block'; // Show the watch trailer button
    }
    const container = document.getElementById('container');
    const iframe = container.querySelector('iframe');
    if (iframe) {
      iframe.remove(); // Remove the existing iframe
    }
    imgdiv.style.display = 'block'; // Show background image
  }
  
