const express = require("express");
const { getMovies, getMovie, postMovie, updateMovie, deleteMovie } = require("./movie.controllers");
const { createMovieValidation, updateMovieValidation } = require("./movie.validation");

const router = express.Router();

router.get("/api/movies", getMovies);
router.get("/api/movies/:id", getMovie);
router.post("/api/movies", createMovieValidation, postMovie);
router.put("/api/movies/:id", updateMovieValidation, updateMovie);
router.delete("/api/movies/:id", deleteMovie);

module.exports = router;