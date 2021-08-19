const express = require("express");
const {getMovies, postMovie, updateMovie, deleteMovie} = require("./movie.controllers");

const router = express.Router();

router.get("/api/movies", getMovies);
router.post("/api/movies", postMovie);
router.put("/api/movies/:id", updateMovie);
router.delete("/api/movies/:id", deleteMovie);

module.exports = router;