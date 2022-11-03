const movieId = localStorage.getItem("id")
const movieDisplayEl = document.querySelector(".movie")

async function getData()
{
    query = `https://ghibliapi.herokuapp.com/films/${movieId}`;
    const promise = await fetch(query);
    const data = await promise.json();
    movieDisplayEl.innerHTML = movieHTML(data);
}

getData()

function movieHTML(movie)
{
    return `
        <img class="movie__img-large" src="${movie.image}" alt="">
        <div class="movie__details">
            <p class="movie__detail"><span class="bold">Movie Title: </span>${movie.title}</p>
            <p class="movie__detail"><span class="bold">Director: </span>${movie.director}</p>
            <p class="movie__detail"><span class="bold">Producer: </span>${movie.producer}</p>
            <p class="movie__detail"><span class="bold">Release Year: </span>${movie.release_date}</p>
            <p class="movie__detail"><span class="bold">Duration: </span>${movie.running_time} mins</p>                        
            <p class="movie__detail"><span class="bold">Description: </span>${movie.description} mins</p>                        
        </div> 
    `
}