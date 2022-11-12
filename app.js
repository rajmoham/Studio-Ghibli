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

function updateDisplay(option)
{   
    if (option === "rating")
    {
        movieDisplayElem.innerHTML = movies.slice().sort((a, b) => b.rt_score - a.rt_score).map(film => movieHTML(film)).join("")
    }
    else if (option === "duration-htl")
    {
        movieDisplayElem.innerHTML = movies.slice().sort((a, b) => b.running_time - a.running_time).map(film => movieHTML(film)).join("")
    }
    else if (option === "duration-lth")
    {
        movieDisplayElem.innerHTML = movies.slice().sort((a, b) => a.running_time - b.running_time).map(film => movieHTML(film)).join("")
    }

    
}


    /* if (option === "rating")
    {
        movieDisplayElem.innerHTML = movies.slice().sort((a, b) => b.rt_score - a.rt_score)
    }
    else if (option === "duration-htl")
    {
        movieDisplayElem.innerHTML = movies.slice().sort((a, b) => b.running_time - a.running_time)
    }
    else if (option === "duration-lth")
    {
        movieDisplayElem.innerHTML = movies.slice().sort((a, b) => a.running_time - b.running_time)
    } */

function showMovieDetail(movieId)
{   
    localStorage.setItem("id", movieId)
    window.location.href = `${window.location.origin}/movie.html`
}

function searchResult()
{
    const searchField = document.querySelector("#search__input").value
    const searchedEl = document.querySelector(".search__result--container")
    if (searchField === "")
    {
        searchedEl.innerHTML = ""
    }
    else
    {
        searchedEl.innerHTML = `<h4 class="search__results">Search Results for : "${searchField}"</h4>
                                <p class="text-link clickable" onclick="clearResults()">Clear Results</p>`
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

function clearResults()
{
    document.querySelector("#search__input").value = ""
    searchResult()
}