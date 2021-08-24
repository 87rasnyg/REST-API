const { Request, Response } = require("express");
const fs = require("fs");

// const movieList = [{
//     id: 0,
//     title: "Gremlings",
//     released: 1984,
//     duration: 107
// }];

/**
 * Sends back the full list of movies in DB 
 * @param {Request} req
 * @param {Response} res
 */
function getMovies(req, res) {
    const movieList = getMovieListFromJsonFile();
    
    if(movieList)
    {
        res.status(200).json(movieList);
    }
    else
    {
        res.status(404).json("something went wrong");
    }
}

/**
 * Sends back the movie with matching id if found otherwise
 * returns a 404 status code
 * @param {Request} req
 * @param {Response} res
 */
function getMovie(req, res) {
    const { id } = req.params;

    const movieList = getMovieListFromJsonFile();

    const movie = movieList.find(movie => movie.id == id);

    if (movie) {
        res.status(200).json(movie);
    }
    else {
        res.status(404).json("No movie with an id of " + id + " was found");
    }
}

/**
 * Adds a movie to the DB and returns a 201 status code 
 * @param {Request} req
 * @param {Response} res
 */
function postMovie(req, res) {

    const movieList = getMovieListFromJsonFile();

    //get current index
    if (movieList.length > 0) {
        id = movieList[movieList.length - 1].id + 1;
    }
    else {
        id = 0;
    }

    const movie = { id: id, ...req.body };

    movieList.push(movie);

    overwriteJsonFileWithData(movieList);

    res.status(201).json(movie);
}

/**
 * Updates a movie with matching id in DB with sent information.
 * it sends back a 200 status code  if successfull or a 404 status
 * code if the id wasn't found. 
 * @param {Request} req
 * @param {Response} res
 */
function updateMovie(req, res) {
    //NEED TO CHANGE THIS SO YOU CANT CHANGE ID WHILE UPDATING
    const { id } = req.params;
    let movieList = getMovieListFromJsonFile()

    //const { title, released, duration } = req.body;
    //let movie = movieList.find(movie => movie.id == id);
    const movieIndex = movieList.findIndex(movie => movie.id == id);

    if (movieIndex >= 0) {
        const updatedMovie = { id: parseInt(id), ...req.body };
        movieList.splice(movieIndex, 1, updatedMovie);

        overwriteJsonFileWithData(movieList);

        res.status(200).json(updatedMovie);
    }
    else {
        res.status(404).json("No movie with an id of " + id + " was found");
    }
}

/**
 * Removes the movie with a matching id from the DB and sends back
 * a 204 status code or a 404 status code if no matching id was found
 * @param {Request} req
 * @param {Response} res
 */
function deleteMovie(req, res) {
    const { id } = req.params;
    let movieList = getMovieListFromJsonFile();

    const movieIndex = movieList.findIndex(movie => movie.id == id);

    if (movieIndex >= 0) {
        movieList.splice(movieIndex, 1);

        overwriteJsonFileWithData(movieList);

        res.status(204).json();
    }
    else {
        res.status(404).json("No movie with an id of " + id + " was found");
    }
}

function overwriteJsonFileWithData(movieList) {
    const data = JSON.stringify(movieList, null, 2);

    console.log(data);

    fs.writeFile("movies.json", data, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function getMovieListFromJsonFile() {

    const data = fs.readFileSync("./movies.json", "utf-8", (err) => {
        if (err) {
            throw err;
        }
    });

    const movieList = JSON.parse(data.toString());
    return movieList;
}

module.exports = {
    getMovies,
    getMovie,
    postMovie,
    updateMovie,
    deleteMovie
}
