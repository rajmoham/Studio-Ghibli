const movieDisplayElem = document.querySelector(".movie__container--grid")
let movies
let moviesDisplay
async function getData()
{
    const promise = await fetch("https://ghibliapi.herokuapp.com/films")
    const data = JSON.parse(JSON.stringify(await promise.json()))
    return data
}

async function main()
{
    movies = await getData()
    movies.sort((a, b) => a.title.localeCompare(b.title))
    movieDisplayElem.innerHTML = movies.map(movie => movieHTML(movie)).join("")
}

function movieHTML(movie)
{
    return `
        <div class="movie__card clickable" onclick="showMovieDetail('${movie.id}')">
            <img class="movie__img" src="${movie.image}" alt="">
            <p class="movie__title">${movie.title}</h5>
            <p class="movie__rating">${movie.rt_score}/100</p>
            <p class="movie__duration">${movie.running_time} mins</p>
        </div>
        `
}

main()

function updateDisplay(selection)
{
    const option = selection.value;
    if (option === "default")
    {
        moviesDisplay.sort((a, b) => a.title.localeCompare(b.title))
    }
    else if (option === "rating")
    {
        moviesDisplay.sort((a, b) => b.rt_score - a.rt_score)
    }
    else if (option === "duration-htl")
    {
        moviesDisplay.sort((a, b) => b.running_time - a.running_time)
    }
    else if (option === "duration-lth")
    {
        moviesDisplay.sort((a, b) => a.running_time - b.running_time)
    }
    
    movieDisplayElem.innerHTML = moviesDisplay.map(movie => movieHTML(movie)).join("");
}

function showMovieDetail(movieId)
{   
    localStorage.setItem("id", movieId)
    window.location.href = `${window.location.origin}/movie.html`
}

function searchResult()
{
    const searchField = document.querySelector("#search__input").value
    const searchedEl = document.querySelector(".search__results")
    if (searchField === "")
    {
        searchedEl.innerHTML = ""
    }
    else
    {
        searchedEl.innerHTML = `Search Results for: "${searchField}"`
    }
    moviesDisplay = movies.filter((movie) => movie.title.toLowerCase().includes(searchField.toLowerCase()))
    movieDisplayElem.innerHTML = moviesDisplay.map(movie => movieHTML(movie)).join("")
}

function checkEnterPressed(event)
{
    if (event.key === "Enter")
    {
        searchResult()
    }
}