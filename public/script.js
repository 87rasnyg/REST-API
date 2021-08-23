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

    for (const test in movieList){
        const movieitem = document.createElement("dl");

        // movieitem.innerHTML = "<dt>Id</dt> <dd>- " + movie.id + "</dd>";
        // movieitem.innerHTML += "<dt>Title</dt> <dd>- " + movie.title + "</dd>";
        // movieitem.innerHTML += "<dt>Released</dt> <dd>- " + movie.released + "</dd>";
        // movieitem.innerHTML += "<dt>Duration</dt> <dd>- " + movie.duration + "</dd>";

        console.log(movieList);

        //movieListDiv.innerHTML += movieitem;
    }
}