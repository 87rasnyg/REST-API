window.addEventListener("load", main);

function main() {
    const getMoviesButton = document.querySelector(".getMovies");
    getMoviesButton.addEventListener("click", fetchAllMovies);

    const getMovieForm = document.querySelector(".getMovieForm");
    getMovieForm.addEventListener("submit", fetchSpecificMovie);

    const postMovieForm = document.querySelector(".postMovieForm");
    postMovieForm.addEventListener("submit", postMovie);

    const updateMovieForm = document.querySelector(".putMovieForm");
    updateMovieForm.addEventListener("submit", putMovie);

    const deleteMovieForm = document.querySelector(".deleteMovieForm");
    deleteMovieForm.addEventListener("submit", deleteMovie);
}

function makeFormToObjectInJson(form) {

    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());

    return JSON.stringify(plainFormData);
}

async function fetchAllMovies(event) {
    const response = await fetch("/api/movies");

    if (response.ok) {
        const movieList = await response.json();
        const movieTable = document.querySelector(".allMoviesTable");
        movieTable.innerHTML = `<tr> 
                                    <th>ID</th> 
                                    <th>Title</th> 
                                    <th>Released</th> 
                                    <th>Duration</th> 
                                </tr> `;

        
        movieList.forEach(movie => {

            const movieitem =`<tr>
                                <td> ${movie.id} </td> 
                                <td> ${movie.title} </td> 
                                <td> ${movie.released} </td> 
                                <td> ${movie.duration} </td>
                              </tr>`

            movieTable.innerHTML += movieitem;
        }); 
        
    }
    else {
        alert("Something went wrong");
    }

}

async function fetchSpecificMovie(event){
    event.preventDefault();
    const movieId = document.getElementById("getMovieId").value;

    const response = await fetch("/api/movies/" + movieId);

    if (response.ok) {
        const movie = await response.json();
        const movieTable = document.querySelector(".movieTable");
        movieTable.innerHTML = `<tr> 
                                    <th>ID</th> 
                                    <th>Title</th> 
                                    <th>Released</th> 
                                    <th>Duration</th> 
                                </tr> 
                                <tr>
                                    <td> ${movie.id} </td> 
                                    <td> ${movie.title} </td> 
                                    <td> ${movie.released} </td> 
                                    <td> ${movie.duration} </td>
                                </tr>`;
    }
    else {
        alert("Something went wrong");
    }
}

async function postMovie(event) {
    const jsonDataToSend = makeFormToObjectInJson(event.currentTarget);

    const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: jsonDataToSend,
    });

    if (response.ok) {
        alert(await response.text() + " was added to the DB");
    }
    else {
        alert("something went wrong:\n" + await response.text());
    }
}

async function putMovie(event) {
    const movieId = document.getElementById("putId").value;    
    
    const jsonDataToSend = makeFormToObjectInJson(event.currentTarget);
    
    const response = await fetch("/api/movies/" + movieId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: jsonDataToSend,
    });

    if (response.ok) {
        alert(await response.text() + " was changed in the DB");
    }
    else {
        alert("something went wrong:\n" + await response.text());
    }
}

async function deleteMovie() {
    const movieId = document.getElementById("deleteId").value;

    const response = await fetch("/api/movies/" + movieId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    });

    if (response.ok) {
        alert("Movie was removed from DB");
    }
    else {
        alert("something went wrong:\n" + await response.text());
    }
}