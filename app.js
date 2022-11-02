const movieDisplayElem = document.querySelector(".movie__container--grid")
let movies

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
        <div class="movie__card clickable">
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
    let movieOrder
    if (option === "default")
    {
        movieOrder = movies
    }
    else if (option === "rating")
    {
        movieOrder = movies.sort((a, b) => b.rt_score - a.rt_score)
    }
    else if (option === "duration-htl")
    {
        movieOrder = movies.sort((a, b) => b.running_time - a.running_time)
    }
    else if (option === "duration-lth")
    {
        movieOrder = movies.sort((a, b) => a.running_time - b.running_time)
    }
    
    movieDisplayElem.innerHTML = movieOrder.map(movie => movieHTML(movie)).join("");
}