window.addEventListener("load", main);

function main(){
    const getMoviesButton = document.querySelector(".getMovies");
    getMoviesButton.addEventListener("click", fetchAllMovies);
}

async function fetchAllMovies(event){
    const response = await fetch("/api/movies");
    const movieList = await response.json();
    const movieListDiv = document.querySelector(".movieList");
    movieListDiv.innerHTML = "";

    movieList.forEach(movie => {
        let movieitem = "<dt>Id</dt> <dd>- " + movie.id + "</dd>";
        movieitem += "<dt>Title</dt> <dd>- " + movie.title + "</dd>";
        movieitem += "<dt>Released</dt> <dd>- " + movie.released + "</dd>";
        movieitem += "<dt>Duration</dt> <dd>- " + movie.duration + "</dd>";

        movieListDiv.innerHTML += movieitem;
    }); 
}