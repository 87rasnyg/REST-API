window.addEventListener("load", main);

function main() {
    const getMoviesButton = document.querySelector(".getMovies");
    getMoviesButton.addEventListener("click", fetchAllMovies);

    const postMovieForm = document.querySelector(".postMovieForm");
    postMovieForm.addEventListener("submit", postMovie);
}

function makeFormToObjectInJson(form) {
    //event.preventDefault();

    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());

    return JSON.stringify(plainFormData);
}

async function fetchAllMovies(event) {
    const response = await fetch("/api/movies");

    if (response.ok) {
        const movieList = await response.json();
        const movieTable = document.querySelector(".movieTable");
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