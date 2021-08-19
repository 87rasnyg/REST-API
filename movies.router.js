const express = require("express");
const router = express.Router();

const movieList = [{
    id: 0,
    title: "Gremlings",
    released: 1984,
    duration: 107
}];

router.get("/api/movies", (req, res) => {
    res.json(movieList);
});

router.post("/api/movies", (req, res) => {
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
});

router.put("/api/movies/:id", (req, res) => {
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
        res.status(400).json("Mo movie with an id of " + id + " was found");
    }
});

router.delete("/api/movies/:id", (req, res) => {
    const { id } = req.params;
    const movieIndex = movieList.findIndex(movie => movie.id == id);
    if (movieIndex >= 0) {
        movieList.splice(movieIndex, 1);
        res.status(204).json();
    }
    else {
        res.status(400).json("Mo movie with an id of " + id + " was found");
    }

});

module.exports = router;