const { Request, Response } = require("express");

const movieList = [{
    id: 0,
    title: "Gremlings",
    released: 1984,
    duration: 107
}];

/**
 * Sends back the full list of movies in DB 
 * @param {Request} req
 * @param {Response} res
 */
function getMovies(req, res) {
    res.json(movieList);
}

/**
 * Adds a movie to the DB and returns a 201 status code 
 * @param {Request} req
 * @param {Response} res
 */
function postMovie(req, res) {
    const { title, released, duration } = req.body;

    //get current index
    if (movieList.length > 0) {
        id = movieList[movieList.length - 1].id + 1;
    }
    else {
        id = 0;
    }

    const movie = {
        id: id,
        title: title,
        released: released,
        duration: duration
    }

    movieList.push(movie);

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
    const { title, released, duration } = req.body;
    const movie = movieList.find(movie => movie.id == id);

    if (movie) {
        if (title) {
            movie.title = title;
        }
        if (released) {
            movie.released = released;
        }
        if (duration) {
            movie.duration = duration;
        }
        res.status(200).json("Changes was made to specified movie");
    }
    else {
        res.status(404).json("Mo movie with an id of " + id + " was found");
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
    const movieIndex = movieList.findIndex(movie => movie.id == id);

    if (movieIndex >= 0) {
        movieList.splice(movieIndex, 1);
        res.status(204).json();
    }
    else {
        res.status(404).json("Mo movie with an id of " + id + " was found");
    }
}

module.exports = {
    getMovies,
    postMovie,
    updateMovie,
    deleteMovie
}
