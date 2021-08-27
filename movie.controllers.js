const { Request, Response } = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

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
        res.status(404).json("Something has gone wrong");
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

    const id = uuidv4();

    const movie = { id: id, title: req.body.title, released: req.body.released, duration: req.body.duration };

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
    const { id } = req.params;
    let movieList = getMovieListFromJsonFile()

    const movieIndex = movieList.findIndex(movie => movie.id == id);

    if (movieIndex >= 0) {

        // Movie should keep old values i no values was given
        const updatedMovie = { 
            id: id,
            title: req.body.title ? req.body.title : movieList[movieIndex].title,
            released: req.body.released ? req.body.released : movieList[movieIndex].released,
            duration: req.body.duration ? req.body.duration : movieList[movieIndex].duration
        };

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

/**
 * Gets a list and overwrites the Json file with the content in the List
 * @param {*} movieList 
 */
function overwriteJsonFileWithData(movieList) {
    const data = JSON.stringify(movieList, null, 2);

    fs.writeFile("movies.json", data, (err) => {
        if (err) {
            throw err;
        }
    });
}

/**
 * Creates a list of movie that it reads from the Json file
 */
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
